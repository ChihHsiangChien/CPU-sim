import {Blocks, createId} from './blocks.js';
import {CpuModules} from './cpu_logic.js';
import {TuringModules} from './turing_logic.js';
import {CONFIG} from './config.js';

export const Generator = {
    generate: (mode) => {
        let circuitData;
        switch (mode) {
        case 'gates': circuitData = Generator.step0(); break;
        case 'turing': circuitData = Generator.step1(); break;
        case 'cpu': circuitData = Generator.step2(); break;
        case 'gpu': circuitData = Generator.step3(); break;
        case 'dff': circuitData = Generator.step4(); break;
        case 'reg4_manual': circuitData = Generator.step5(); break;
        case 'reg4': circuitData = Generator.step6(); break;
        case 'add4': circuitData = Generator.step7(); break;
        case 'mux2': circuitData = Generator.step8(); break;
        case 'alu4': circuitData = Generator.step9(); break;
        case 'decoder': circuitData = Generator.step10(); break;
        case 'pc4': circuitData = Generator.step11(); break;
        case 'rom16': circuitData = Generator.step12(); break;
        case 'cpu_final': circuitData = Generator.step13(); break;
        default: circuitData = Generator.step0();
        }
        return circuitData;
    },

    step0: () => {
        return {
            devices: {
                a: { type: 'Button', label: 'In A', attributes: { position: { x: 20, y: 50 } } },
                b: { type: 'Button', label: 'In B', attributes: { position: { x: 20, y: 150 } } },
                and: { type: 'And', bits: 1, attributes: { position: { x: 80, y: 30 } } },
                or: { type: 'Or', bits: 1, attributes: { position: { x: 80, y: 100 } } },
                xor: { type: 'Xor', bits: 1, attributes: { position: { x: 80, y: 170 } } },
                not: { type: 'Not', bits: 1, attributes: { position: { x: 80, y: 240 } } },
                out_and: { type: 'Output', bits: 1, label: 'AND', attributes: { position: { x: 140, y: 30 } } },
                out_or: { type: 'Output', bits: 1, label: 'OR', attributes: { position: { x: 140, y: 100 } } },
                out_xor: { type: 'Output', bits: 1, label: 'XOR', attributes: { position: { x: 140, y: 170 } } },
                out_not: { type: 'Output', bits: 1, label: 'NOT', attributes: { position: { x: 140, y: 240 } } }
            },
            connectors: [
                { from: { id: 'a', port: 'out' }, to: { id: 'and', port: 'in1' } },
                { from: { id: 'b', port: 'out' }, to: { id: 'and', port: 'in2' } },
                { from: { id: 'and', port: 'out' }, to: { id: 'out_and', port: 'in' } },
                { from: { id: 'a', port: 'out' }, to: { id: 'or', port: 'in1' } },
                { from: { id: 'b', port: 'out' }, to: { id: 'or', port: 'in2' } },
                { from: { id: 'or', port: 'out' }, to: { id: 'out_or', port: 'in' } },
                { from: { id: 'a', port: 'out' }, to: { id: 'xor', port: 'in1' } },
                { from: { id: 'b', port: 'out' }, to: { id: 'xor', port: 'in2' } },
                { from: { id: 'xor', port: 'out' }, to: { id: 'out_xor', port: 'in' } },
                { from: { id: 'a', port: 'out' }, to: { id: 'not', port: 'in' } },
                { from: { id: 'not', port: 'out' }, to: { id: 'out_not', port: 'in' } }
            ]
        };
    },

    step13: () => {
        return {
            devices: {
                clk_source: { type: 'Clock', label: 'CPU CLK', attributes: { position: { x: 20, y: 100 } } },
                rst: { type: 'Button', label: 'RESET', attributes: { position: { x: 20, y: 200 } } },

                // --- FETCH ---
                pc: { type: 'Dff', bits: 4, label: 'PC', polarity: { clock: true, arst: true }, attributes: { position: { x: 150, y: 150 } } },
                pc_inc: { type: 'Addition', bits: { in1: 4, in2: 4, out: 4 }, attributes: { position: { x: 250, y: 80 } } },
                pc_const: { type: 'Constant', bits: 4, constant: '0001', attributes: { position: { x: 200, y: 50 } } },
                pc_mux: { type: 'Mux', bits: { in: 4, sel: 1 }, attributes: { position: { x: 350, y: 150 } } },
                disp_pc: { type: 'NumDisplay', bits: 4, label: 'PC_ADDR', attributes: { position: { x: 150, y: 250 } } },

                // --- ROM ---
                w0: { type: 'Constant', bits: 6, constant: '000101', label: 'LOAD 5', attributes: { position: { x: 450, y: 50 } } },
                w1: { type: 'Constant', bits: 6, constant: '010011', label: 'ADD 3', attributes: { position: { x: 450, y: 110 } } },
                w2: { type: 'Constant', bits: 6, constant: '100010', label: 'SUB 2', attributes: { position: { x: 450, y: 170 } } },
                w3: { type: 'Constant', bits: 6, constant: '110000', label: 'JMP 0', attributes: { position: { x: 450, y: 230 } } },
                rom_mux: { type: 'Mux', bits: { in: 6, sel: 2 }, attributes: { position: { x: 580, y: 120 } } },
                disp_instr: { type: 'NumDisplay', bits: 6, numbase: 'bin', label: 'INSTR', attributes: { position: { x: 580, y: 40 } } },

                // --- DECODE ---
                split: { type: 'BusUngroup', groups: [4, 2], attributes: { position: { x: 680, y: 120 } } },
                op_split: { type: 'BusUngroup', groups: [1, 1], attributes: { position: { x: 750, y: 50 } } },
                not0: { type: 'Not', bits: 1, attributes: { position: { x: 810, y: 20 } } },
                not1: { type: 'Not', bits: 1, attributes: { position: { x: 810, y: 80 } } },
                is_load: { type: 'And', bits: 1, label: 'LD', attributes: { position: { x: 880, y: 10 } } },
                is_add:  { type: 'And', bits: 1, label: 'AD',  attributes: { position: { x: 880, y: 60 } } },
                is_sub:  { type: 'And', bits: 1, label: 'SB',  attributes: { position: { x: 880, y: 110 } } },
                is_jmp:  { type: 'And', bits: 1, label: 'JP',  attributes: { position: { x: 880, y: 160 } } },

                // --- EXECUTE ---
                acc_en: { type: 'Or', bits: 1, inputs: 3, attributes: { position: { x: 980, y: 50 } } },
                alu_add: { type: 'Addition', bits: { in1: 4, in2: 4, out: 4 }, attributes: { position: { x: 950, y: 220 } } },
                alu_sub: { type: 'Subtraction', bits: { in1: 4, in2: 4, out: 4 }, attributes: { position: { x: 950, y: 300 } } },
                alu_mux: { type: 'Mux', bits: { in: 4, sel: 1 }, attributes: { position: { x: 1050, y: 260 } } },
                acc_mux: { type: 'Mux', bits: { in: 4, sel: 1 }, attributes: { position: { x: 1130, y: 200 } } },
                acc: { type: 'Dff', bits: 4, label: 'ACC', polarity: { clock: true, enable: true }, attributes: { position: { x: 1220, y: 200 } } },

                // --- DISPLAYS ---
                disp_data: { type: 'NumDisplay', bits: 4, label: 'DATA_VAL', attributes: { position: { x: 720, y: 250 } } },
                disp_alu: { type: 'NumDisplay', bits: 4, label: 'ALU_OUT', attributes: { position: { x: 1050, y: 350 } } },
                disp_acc: { type: 'NumDisplay', bits: 4, label: 'ACC_OUT', attributes: { position: { x: 1320, y: 200 } } }
            },
            connectors: [
                { from: { id: 'clk_source', port: 'out' }, to: { id: 'pc', port: 'clk' } },
                { from: { id: 'clk_source', port: 'out' }, to: { id: 'acc', port: 'clk' } },
                { from: { id: 'rst', port: 'out' }, to: { id: 'pc', port: 'arst' } },
                { from: { id: 'pc', port: 'out' }, to: { id: 'pc_inc', port: 'in1' } },
                { from: { id: 'pc_const', port: 'out' }, to: { id: 'pc_inc', port: 'in2' } },
                { from: { id: 'pc_inc', port: 'out' }, to: { id: 'pc_mux', port: 'in0' } },
                { from: { id: 'split', port: 'out0' }, to: { id: 'pc_mux', port: 'in1' } },
                { from: { id: 'is_jmp', port: 'out' }, to: { id: 'pc_mux', port: 'sel' } },
                { from: { id: 'pc_mux', port: 'out' }, to: { id: 'pc', port: 'in' } },
                { from: { id: 'pc', port: 'out' }, to: { id: 'disp_pc', port: 'in' } },
                { from: { id: 'pc', port: 'out' }, to: { id: 'rom_mux', port: 'sel' } },
                { from: { id: 'w0', port: 'out' }, to: { id: 'rom_mux', port: 'in0' } },
                { from: { id: 'w1', port: 'out' }, to: { id: 'rom_mux', port: 'in1' } },
                { from: { id: 'w2', port: 'out' }, to: { id: 'rom_mux', port: 'in2' } },
                { from: { id: 'w3', port: 'out' }, to: { id: 'rom_mux', port: 'in3' } },
                { from: { id: 'rom_mux', port: 'out' }, to: { id: 'disp_instr', port: 'in' } },
                { from: { id: 'rom_mux', port: 'out' }, to: { id: 'split', port: 'in' } },
                { from: { id: 'split', port: 'out1' }, to: { id: 'op_split', port: 'in' } },
                { from: { id: 'split', port: 'out0' }, to: { id: 'disp_data', port: 'in' } },
                { from: { id: 'op_split', port: 'out0' }, to: { id: 'not0', port: 'in' } },
                { from: { id: 'op_split', port: 'out1' }, to: { id: 'not1', port: 'in' } },
                { from: { id: 'not1', port: 'out' }, to: { id: 'is_load', port: 'in1' } }, { from: { id: 'not0', port: 'out' }, to: { id: 'is_load', port: 'in2' } },
                { from: { id: 'not1', port: 'out' }, to: { id: 'is_add', port: 'in1' } },  { from: { id: 'op_split', port: 'out0' }, to: { id: 'is_add', port: 'in2' } },
                { from: { id: 'op_split', port: 'out1' }, to: { id: 'is_sub', port: 'in1' } }, { from: { id: 'not0', port: 'out' }, to: { id: 'is_sub', port: 'in2' } },
                { from: { id: 'op_split', port: 'out1' }, to: { id: 'is_jmp', port: 'in1' } }, { from: { id: 'op_split', port: 'out0' }, to: { id: 'is_jmp', port: 'in2' } },
                { from: { id: 'is_load', port: 'out' }, to: { id: 'acc_en', port: 'in1' } },
                { from: { id: 'is_add', port: 'out' }, to: { id: 'acc_en', port: 'in2' } },
                { from: { id: 'is_sub', port: 'out' }, to: { id: 'acc_en', port: 'in3' } },
                { from: { id: 'acc_en', port: 'out' }, to: { id: 'acc', port: 'en' } },
                { from: { id: 'is_sub', port: 'out' }, to: { id: 'alu_mux', port: 'sel' } },
                { from: { id: 'is_load', port: 'out' }, to: { id: 'acc_mux', port: 'sel' } },
                { from: { id: 'acc', port: 'out' }, to: { id: 'alu_add', port: 'in1' } },
                { from: { id: 'split', port: 'out0' }, to: { id: 'alu_add', port: 'in2' } },
                { from: { id: 'acc', port: 'out' }, to: { id: 'alu_sub', port: 'in1' } },
                { from: { id: 'split', port: 'out0' }, to: { id: 'alu_sub', port: 'in2' } },
                { from: { id: 'alu_add', port: 'out' }, to: { id: 'alu_mux', port: 'in0' } },
                { from: { id: 'alu_sub', port: 'out' }, to: { id: 'alu_mux', port: 'in1' } },
                { from: { id: 'alu_mux', port: 'out' }, to: { id: 'disp_alu', port: 'in' } },
                { from: { id: 'alu_mux', port: 'out' }, to: { id: 'acc_mux', port: 'in0' } },
                { from: { id: 'split', port: 'out0' }, to: { id: 'acc_mux', port: 'in1' } },
                { from: { id: 'acc_mux', port: 'out' }, to: { id: 'acc', port: 'in' } },
                { from: { id: 'acc', port: 'out' }, to: { id: 'disp_acc', port: 'in' } }
            ]
        };
    }
};
