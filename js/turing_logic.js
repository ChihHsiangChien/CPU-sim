import { Blocks } from './blocks.js';
import { CONFIG } from './config.js';

/**
 * 圖靈機特化邏輯
 */

export const TuringModules = {
    // 圖靈機紙帶 (用 RAM 模擬)
    Tape: () => {
        return {
            type: 'RAM',
            bits: 1, // 紙帶通常存 0/1
            addr_bits: 4, // 16 個位置的紙帶
            label: 'TAPE'
        };
    },

    // 狀態控制器
    StateManager: () => {
        return {
            type: 'ROM',
            bits: 8, // 指令與下一個狀態
            addr_bits: 4,
            label: 'STATE_FSM'
        };
    }
};
