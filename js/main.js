import { Generator } from './generator.js?v=101';
import { CONFIG } from './config.js?v=101';

const DESCRIPTIONS = {
    'gates': '<b>Step: 0 邏輯閘</b><br>展示基礎單元：AND, OR, XOR, NOT。',
    'turing': '<b>Step: 1 半加器</b><br>計算 1-bit 加法，包含和(Sum)與進位(Carry)。',
    'cpu': '<b>Step: 2 全加器</b><br>支援 Cin 進位輸入，可串聯成多位元加法器。',
    'gpu': '<b>Step: 3 D-Latch 鎖存器</b><br>位準觸發的記憶單元。',
    'dff': '<b>Step: 4 D 正反器</b><br>邊緣觸發的記憶單元，是同步電路的基礎。',
    'reg4_manual': '<b>Step: 5 手動暫存器</b><br>由 4 個 DFF 組成的 4-bit 儲存空間。',
    'reg4': '<b>Step: 6 內建暫存器</b><br>具有 LOAD 致能訊號的標準暫存器。',
    'add4': '<b>Step: 7 4 位元加法器</b><br>同時處理 4-bit 數據的加法。',
    'mux2': '<b>Step: 8 多路復用器</b><br>4 對 1 數據選擇器。',
    'alu4': '<b>Step: 9 算術邏輯單元 (ALU)</b><br>支援多種運算的處理核心。',
    'decoder': '<b>Step: 10 指令解碼器</b><br>將二進位指令轉換為硬體控制訊號。',
    'pc4': '<b>Step: 11 程式計數器 (PC)</b><br>追蹤指令地址並支援自動遞增。',
    'rom16': '<b>Step: 12 指令記憶體 (ROM)</b><br>這是儲存程式碼的地方。我們將記憶體切成一格一格的「字組 (Word)」。<br>1. <b>地址 (Address)：</b> 決定目前要讀哪一格。<br>2. <b>字組 (Word)：</b> 該格子內儲存的 4 位元二進位數據。',
    'cpu_final': '<b>Step: 13 完整 CPU 集成</b><br>結合所有組件的迷你電腦：<br><ul><li><b>PC (Program Counter):</b> 程式計數器 — 追蹤目前指令的「地址」。</li><li><b>ALU (Arithmetic Logic Unit):</b> 算術邏輯單元 — 負責數學加減與邏輯運算。</li><li><b>ACC (Accumulator):</b> 累加暫存器 — CPU 內部最重要的臨時資料儲存槽。</li><li><b>ROM (Read-Only Memory):</b> 唯讀記憶體 — 存放程式碼的地方。</li><li><b>MUX (Multiplexer):</b> 多路復用器 — 像切換開關一樣，根據訊號決定讓哪條線的資料通過。</li></ul>'
};

class App {
    constructor() {
        this.circuit = null;
        this.paper = null;
        this.currentMode = 'gates';
        this.isPlaying = false;
        this.isDraggable = false;
        this.heartbeat = null; // 定時器
        this.init();
    }

    async init() {
        this.bindEvents();
        try {
            const dj = await this.waitForDigitalJS();
            $('#v-dj').text(dj.version || '0.13.x');
            $('#v-joint').text(window.joint?.version || 'unknown');
            this.renderCircuit(this.currentMode);
        } catch (e) {
            console.error("APP_INIT_ERROR:", e);
            $('#paper').html(`<div style="padding:20px; color:red;"><h3>DigitalJS 載入失敗</h3><p>${e.message}</p></div>`);
        }
    }

    waitForDigitalJS() {
        return new Promise((resolve, reject) => {
            let count = 0;
            const check = () => {
                let dj = window.digitaljs || window.DigitalJS;
                const joint = window.joint || window.Joint;
                if (!dj?.Circuit && dj?.default?.Circuit) dj = dj.default;
                if (dj && dj.Circuit && joint) {
                    window.digitaljs = dj;
                    window.joint = joint;
                    resolve(dj);
                } else if (count > 40) {
                    reject(new Error("找不到 DigitalJS 或 JointJS。"));
                } else {
                    count++;
                    setTimeout(check, 200);
                }
            };
            check();
        });
    }

    bindEvents() {
        $('#hardware-tree li').on('click', (e) => {
            const mode = $(e.currentTarget).data('mode');
            if (mode === this.currentMode) return;
            $('#hardware-tree li').removeClass('active');
            $(e.currentTarget).addClass('active');
            this.currentMode = mode;
            this.renderCircuit(mode);
        });

        $('#btn-play').on('click', () => {
            if (!this.circuit) return;
            this.isPlaying = !this.isPlaying;
            if (this.isPlaying) {
                this.startSimulation();
            } else {
                this.stopSimulation();
            }
        });

        $('#btn-reset').on('click', () => {
            this.renderCircuit(this.currentMode);
        });

        $('#btn-reset-view').on('click', () => {
            if (this.paper) {
                this.paper.translate(0, 0);
                this.paper.scale(1, 1);
            }
        });

        $('#btn-toggle-edit').on('click', () => {
            this.isDraggable = !this.isDraggable;
            const btn = $('#btn-toggle-edit');
            if (this.isDraggable) {
                btn.text('🔓 Edit Mode: ON').css('background', '#007acc');
                if (this.paper) this.paper.setInteractivity({ elementMove: true });
            } else {
                btn.text('🔒 Edit Mode: OFF').css('background', '#444');
                if (this.paper) this.paper.setInteractivity({ elementMove: false });
            }
        });

        $('#btn-assemble').on('click', () => this.assembleCode());
    }

    startSimulation() {
        if (!this.circuit) return;
        this.isPlaying = true;
        this.circuit.start();
        $('#btn-play').text('⏸ Pause').css('background', '#d9534f');
    }

    stopSimulation() {
        this.isPlaying = false;
        if (this.circuit) this.circuit.stop();
        $('#btn-play').text('▶ Play').css('background', '#0e639c');
    }

    renderCircuit(mode) {
        this.stopSimulation();
        const json = Generator.generate(mode);
        $('#paper').empty();
        $('#circuit-info').html(DESCRIPTIONS[mode] || '無說明。');
        
        try {
            const DigitalJS = window.digitaljs;
            if (!DigitalJS || !DigitalJS.Circuit) throw new Error("DigitalJS.Circuit is not available.");

            this.circuit = new DigitalJS.Circuit(json);
            this.paper = this.circuit.displayOn($('#paper'));
            this.paper.setInteractivity({ elementMove: this.isDraggable });
            
            // ... (keeping pan/zoom events)
            let dragStartPosition = null;
            $('#paper').off('mousedown.pan').on('mousedown.pan', (evt) => {
                if (this.isDraggable && evt.target.closest('.joint-cell')) return;
                dragStartPosition = { x: evt.clientX, y: evt.clientY };
                $('#paper').css('cursor', 'grabbing');
                evt.preventDefault();
            });

            $(document).off('.pan').on('mousemove.pan', (evt) => {
                if (!dragStartPosition) return;
                const dx = evt.clientX - dragStartPosition.x;
                const dy = evt.clientY - dragStartPosition.y;
                dragStartPosition = { x: evt.clientX, y: evt.clientY };
                const currentOrigin = this.paper.translate();
                this.paper.translate(currentOrigin.tx + dx, currentOrigin.ty + dy);
            }).on('mouseup.pan mouseleave.pan', () => {
                if (!dragStartPosition) return;
                dragStartPosition = null;
                $('#paper').css('cursor', 'grab');
            });

            $('#paper').css('cursor', 'grab');
            
            this.paper.on('blank:mousewheel cell:mousewheel', (evt, x, y, delta) => {
                if (evt && typeof evt.preventDefault === 'function') evt.preventDefault();
                const oldScale = this.paper.scale().sx;
                const newScale = Math.max(0.2, Math.min(5, oldScale + delta * 0.1));
                this.paper.scale(newScale, newScale);
            });

            // Auto-play for ALL modes
            setTimeout(() => this.startSimulation(), 300);
            
            this.updateMonitor();
        } catch (err) {
            console.error("RENDER_ERROR:", err);
            const jsonStr = JSON.stringify(json, null, 2);
            $('#paper').html(`<div style="padding:20px; color:red; background:#fff1f0;"><h3>渲染出錯: ${err.message}</h3><details><summary>JSON</summary><pre>${jsonStr}</pre></details></div>`);
        }
    }

    assembleCode() {
        alert("編譯器功能開發中。");
    }

    updateMonitor() {
        if (this.heartbeat) clearInterval(this.heartbeat);
        this.heartbeat = setInterval(() => {
            if (!this.circuit || !this.isPlaying) return;
            
            const $tbody = $('#reg-table tbody');
            const devices = this.circuit.getDevices();
            if (!devices || devices.length === 0) return;

            // 優先透過 ID 尋找，其次是 Label
            const findDev = (name) => {
                return devices.find(d => d.id === name || d.get('label') === name);
            };

            const pcDev = findDev('pc');
            const accDev = findDev('acc');
            
            const getVal = (dev) => {
                if (!dev) return '0000';
                const state = dev.get('state');
                if (!state) return '0000';
                // 嘗試多種可能的輸出欄位名稱 (out, q, Q)
                const raw = state.out || state.q || state.Q || '0000';
                return typeof raw === 'string' ? raw : '0000';
            };

            const pcVal = getVal(pcDev);
            const accVal = getVal(accDev);

            $tbody.empty();
            [{ name: 'PC', val: pcVal }, { name: 'ACC', val: accVal }].forEach(r => {
                const cleanVal = r.val.replace(/x/g, '0');
                const hex = parseInt(cleanVal, 2).toString(16).toUpperCase();
                $tbody.append(`<tr><td><b>${r.name}</b></td><td style="color:#0f0; font-family:monospace;">0x${hex}</td><td style="font-size:10px; opacity:0.7;">${r.val}</td></tr>`);
            });
        }, 200);
    }
}

$(document).ready(() => { window.app = new App(); });
