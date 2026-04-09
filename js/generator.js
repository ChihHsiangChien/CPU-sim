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

    // Step 1: Half-Adder
    step1: () => {
        return {
            devices: {
                a: { type: 'Button', label: 'A', attributes: { position: { x: 50, y: 50 } } },
                b: { type: 'Button', label: 'B', attributes: { position: { x: 50, y: 150 } } },
                xor: { type: 'Xor', bits: 1, attributes: { position: { x: 150, y: 50 } } },
                and: { type: 'And', bits: 1, attributes: { position: { x: 150, y: 150 } } },
                sum: { type: 'Output', bits: 1, label: 'Sum', attributes: { position: { x: 250, y: 50 } } },
                carry: { type: 'Output', bits: 1, label: 'Carry', attributes: { position: { x: 250, y: 150 } } }
            },
            connectors: [
                { from: { id: 'a', port: 'out' }, to: { id: 'xor', port: 'in1' } },
                { from: { id: 'b', port: 'out' }, to: { id: 'xor', port: 'in2' } },
                { from: { id: 'a', port: 'out' }, to: { id: 'and', port: 'in1' } },
                { from: { id: 'b', port: 'out' }, to: { id: 'and', port: 'in2' } },
                { from: { id: 'xor', port: 'out' }, to: { id: 'sum', port: 'in' } },
                { from: { id: 'and', port: 'out' }, to: { id: 'carry', port: 'in' } }
            ]
        };
    },

    // Step 2: Full-Adder
    step2: () => {
        return {
            devices: {
                a: { type: 'Button', label: 'A', attributes: { position: { x: 50, y: 50 } } },
                b: { type: 'Button', label: 'B', attributes: { position: { x: 50, y: 130 } } },
                cin: { type: 'Button', label: 'Cin', attributes: { position: { x: 50, y: 210 } } },
                xor1: { type: 'Xor', bits: 1, attributes: { position: { x: 150, y: 70 } } },
                xor2: { type: 'Xor', bits: 1, attributes: { position: { x: 250, y: 100 } } },
                and1: { type: 'And', bits: 1, attributes: { position: { x: 150, y: 170 } } },
                and2: { type: 'And', bits: 1, attributes: { position: { x: 250, y: 200 } } },
                or: { type: 'Or', bits: 1, attributes: { position: { x: 350, y: 180 } } },
                sum: { type: 'Output', bits: 1, label: 'Sum', attributes: { position: { x: 450, y: 100 } } },
                cout: { type: 'Output', bits: 1, label: 'Cout', attributes: { position: { x: 450, y: 180 } } }
            },
            connectors: [
                { from: { id: 'a', port: 'out' }, to: { id: 'xor1', port: 'in1' } },
                { from: { id: 'b', port: 'out' }, to: { id: 'xor1', port: 'in2' } },
                { from: { id: 'xor1', port: 'out' }, to: { id: 'xor2', port: 'in1' } },
                { from: { id: 'cin', port: 'out' }, to: { id: 'xor2', port: 'in2' } },
                { from: { id: 'xor2', port: 'out' }, to: { id: 'sum', port: 'in' } },
                { from: { id: 'a', port: 'out' }, to: { id: 'and1', port: 'in1' } },
                { from: { id: 'b', port: 'out' }, to: { id: 'and1', port: 'in2' } },
                { from: { id: 'xor1', port: 'out' }, to: { id: 'and2', port: 'in1' } },
                { from: { id: 'cin', port: 'out' }, to: { id: 'and2', port: 'in2' } },
                { from: { id: 'and1', port: 'out' }, to: { id: 'or', port: 'in1' } },
                { from: { id: 'and2', port: 'out' }, to: { id: 'or', port: 'in2' } },
                { from: { id: 'or', port: 'out' }, to: { id: 'cout', port: 'in' } }
            ]
        };
    },

    // Step 3: D-Latch
    step3: () => {
        return {
            devices: {
                d: { type: 'Button', label: 'D (Data)', attributes: { position: { x: 50, y: 80 } } },
                en: { type: 'Button', label: 'E (Enable)', attributes: { position: { x: 50, y: 180 } } },
                not: { type: 'Not', bits: 1, attributes: { position: { x: 120, y: 50 } } },
                and1: { type: 'And', bits: 1, attributes: { position: { x: 200, y: 70 } } },
                and2: { type: 'And', bits: 1, attributes: { position: { x: 200, y: 160 } } },
                nor1: { type: 'Nor', bits: 1, attributes: { position: { x: 300, y: 90 } } },
                nor2: { type: 'Nor', bits: 1, attributes: { position: { x: 300, y: 180 } } },
                q: { type: 'Output', bits: 1, label: 'Q', attributes: { position: { x: 400, y: 90 } } },
                nq: { type: 'Output', bits: 1, label: '~Q', attributes: { position: { x: 400, y: 180 } } }
            },
            connectors: [
                { from: { id: 'd', port: 'out' }, to: { id: 'not', port: 'in' } },
                { from: { id: 'not', port: 'out' }, to: { id: 'and1', port: 'in1' } },
                { from: { id: 'en', port: 'out' }, to: { id: 'and1', port: 'in2' } },
                { from: { id: 'd', port: 'out' }, to: { id: 'and2', port: 'in1' } },
                { from: { id: 'en', port: 'out' }, to: { id: 'and2', port: 'in2' } },
                { from: { id: 'and1', port: 'out' }, to: { id: 'nor1', port: 'in1' } },
                { from: { id: 'nor2', port: 'out' }, to: { id: 'nor1', port: 'in2' } },
                { from: { id: 'and2', port: 'out' }, to: { id: 'nor2', port: 'in2' } },
                { from: { id: 'nor1', port: 'out' }, to: { id: 'nor2', port: 'in1' } },
                { from: { id: 'nor1', port: 'out' }, to: { id: 'q', port: 'in' } },
                { from: { id: 'nor2', port: 'out' }, to: { id: 'nq', port: 'in' } }
            ]
        };
    },

    // Step 4: D-Flip-Flop
    step4: () => {
        return {
            devices: {
                d: { type: 'Button', label: 'D', attributes: { position: { x: 50, y: 50 } } },
                clk: { type: 'Clock', label: 'CLK', attributes: { position: { x: 50, y: 150 } } },
                dff: { type: 'Dff', bits: 1, attributes: { position: { x: 150, y: 100 } } },
                q: { type: 'Output', bits: 1, label: 'Q', attributes: { position: { x: 250, y: 100 } } }
            },
            connectors: [
                { from: { id: 'd', port: 'out' }, to: { id: 'dff', port: 'in' } },
                { from: { id: 'clk', port: 'out' }, to: { id: 'dff', port: 'clk' } },
                { from: { id: 'dff', port: 'out' }, to: { id: 'q', port: 'in' } }
            ]
        };
    },

    // Step 5: Manual 4-bit Register
    step5: () => {
        return {
            devices: {
                d0: { type: 'Button', label: 'D0', attributes: { position: { x: 50, y: 30 } } },
                d1: { type: 'Button', label: 'D1', attributes: { position: { x: 50, y: 110 } } },
                d2: { type: 'Button', label: 'D2', attributes: { position: { x: 50, y: 190 } } },
                d3: { type: 'Button', label: 'D3', attributes: { position: { x: 50, y: 270 } } },
                clk: { type: 'Clock', label: 'CLK', attributes: { position: { x: 50, y: 350 } } },
                dff0: { type: 'Dff', bits: 1, attributes: { position: { x: 200, y: 30 } } },
                dff1: { type: 'Dff', bits: 1, attributes: { position: { x: 200, y: 110 } } },
                dff2: { type: 'Dff', bits: 1, attributes: { position: { x: 200, y: 190 } } },
                dff3: { type: 'Dff', bits: 1, attributes: { position: { x: 200, y: 270 } } },
                out: { type: 'BusGroup', groups: [1, 1, 1, 1], attributes: { position: { x: 350, y: 150 } } },
                disp: { type: 'NumDisplay', bits: 4, attributes: { position: { x: 450, y: 150 } } }
            },
            connectors: [
                { from: { id: 'd0', port: 'out' }, to: { id: 'dff0', port: 'in' } },
                { from: { id: 'd1', port: 'out' }, to: { id: 'dff1', port: 'in' } },
                { from: { id: 'd2', port: 'out' }, to: { id: 'dff2', port: 'in' } },
                { from: { id: 'd3', port: 'out' }, to: { id: 'dff3', port: 'in' } },
                { from: { id: 'clk', port: 'out' }, to: { id: 'dff0', port: 'clk' } },
                { from: { id: 'clk', port: 'out' }, to: { id: 'dff1', port: 'clk' } },
                { from: { id: 'clk', port: 'out' }, to: { id: 'dff2', port: 'clk' } },
                { from: { id: 'clk', port: 'out' }, to: { id: 'dff3', port: 'clk' } },
                { from: { id: 'dff0', port: 'out' }, to: { id: 'out', port: 'in0' } },
                { from: { id: 'dff1', port: 'out' }, to: { id: 'out', port: 'in1' } },
                { from: { id: 'dff2', port: 'out' }, to: { id: 'out', port: 'in2' } },
                { from: { id: 'dff3', port: 'out' }, to: { id: 'out', port: 'in3' } },
                { from: { id: 'out', port: 'out' }, to: { id: 'disp', port: 'in' } }
            ]
        };
    },

    // Step 6: Primitive 4-bit Register with Enable
    step6: () => {
        return {
            devices: {
                in: { type: 'NumEntry', bits: 4, attributes: { position: { x: 50, y: 50 } } },
                en: { type: 'Button', label: 'LOAD', attributes: { position: { x: 50, y: 130 } } },
                clk: { type: 'Clock', label: 'CLK', attributes: { position: { x: 50, y: 200 } } },
                reg: { type: 'Dff', bits: 4, polarity: { clock: true, enable: true }, attributes: { position: { x: 200, y: 100 } } },
                out: { type: 'NumDisplay', bits: 4, attributes: { position: { x: 350, y: 100 } } }
            },
            connectors: [
                { from: { id: 'in', port: 'out' }, to: { id: 'reg', port: 'in' } },
                { from: { id: 'en', port: 'out' }, to: { id: 'reg', port: 'en' } },
                { from: { id: 'clk', port: 'out' }, to: { id: 'reg', port: 'clk' } },
                { from: { id: 'reg', port: 'out' }, to: { id: 'out', port: 'in' } }
            ]
        };
    },

    // Step 7: 4-bit Adder
    step7: () => {
        return {
            devices: {
                a: { type: 'NumEntry', bits: 4, label: 'A', attributes: { position: { x: 50, y: 50 } } },
                b: { type: 'NumEntry', bits: 4, label: 'B', attributes: { position: { x: 50, y: 150 } } },
                adder: { type: 'Addition', bits: { in1: 4, in2: 4, out: 4 }, attributes: { position: { x: 200, y: 100 } } },
                out: { type: 'NumDisplay', bits: 4, label: 'Sum', attributes: { position: { x: 350, y: 100 } } }
            },
            connectors: [
                { from: { id: 'a', port: 'out' }, to: { id: 'adder', port: 'in1' } },
                { from: { id: 'b', port: 'out' }, to: { id: 'adder', port: 'in2' } },
                { from: { id: 'adder', port: 'out' }, to: { id: 'out', port: 'in' } }
            ]
        };
    },

    // Step 8: 4-to-1 Mux
    step8: () => {
        return {
            devices: {
                in0: { type: 'Constant', bits: 4, constant: '0001', attributes: { position: { x: 50, y: 30 } } },
                in1: { type: 'Constant', bits: 4, constant: '0010', attributes: { position: { x: 50, y: 80 } } },
                in2: { type: 'Constant', bits: 4, constant: '0100', attributes: { position: { x: 50, y: 130 } } },
                in3: { type: 'Constant', bits: 4, constant: '1000', attributes: { position: { x: 50, y: 180 } } },
                sel: { type: 'NumEntry', bits: 2, label: 'SELECT', attributes: { position: { x: 50, y: 250 } } },
                mux: { type: 'Mux', bits: { in: 4, sel: 2 }, attributes: { position: { x: 200, y: 100 } } },
                out: { type: 'NumDisplay', bits: 4, attributes: { position: { x: 350, y: 100 } } }
            },
            connectors: [
                { from: { id: 'in0', port: 'out' }, to: { id: 'mux', port: 'in0' } },
                { from: { id: 'in1', port: 'out' }, to: { id: 'mux', port: 'in1' } },
                { from: { id: 'in2', port: 'out' }, to: { id: 'mux', port: 'in2' } },
                { from: { id: 'in3', port: 'out' }, to: { id: 'mux', port: 'in3' } },
                { from: { id: 'sel', port: 'out' }, to: { id: 'mux', port: 'sel' } },
                { from: { id: 'mux', port: 'out' }, to: { id: 'out', port: 'in' } }
            ]
        };
    },

    // Step 9: 4-bit ALU (Add/Sub)
    step9: () => {
        return {
            devices: {
                a: { type: 'NumEntry', bits: 4, label: 'A', attributes: { position: { x: 50, y: 50 } } },
                b: { type: 'NumEntry', bits: 4, label: 'B', attributes: { position: { x: 50, y: 150 } } },
                sel: { type: 'Button', label: 'ADD/SUB', attributes: { position: { x: 50, y: 250 } } },
                add: { type: 'Addition', bits: { in1: 4, in2: 4, out: 4 }, attributes: { position: { x: 200, y: 50 } } },
                sub: { type: 'Subtraction', bits: { in1: 4, in2: 4, out: 4 }, attributes: { position: { x: 200, y: 150 } } },
                mux: { type: 'Mux', bits: { in: 4, sel: 1 }, attributes: { position: { x: 350, y: 100 } } },
                out: { type: 'NumDisplay', bits: 4, attributes: { position: { x: 500, y: 100 } } }
            },
            connectors: [
                { from: { id: 'a', port: 'out' }, to: { id: 'add', port: 'in1' } },
                { from: { id: 'b', port: 'out' }, to: { id: 'add', port: 'in2' } },
                { from: { id: 'a', port: 'out' }, to: { id: 'sub', port: 'in1' } },
                { from: { id: 'b', port: 'out' }, to: { id: 'sub', port: 'in2' } },
                { from: { id: 'add', port: 'out' }, to: { id: 'mux', port: 'in0' } },
                { from: { id: 'sub', port: 'out' }, to: { id: 'mux', port: 'in1' } },
                { from: { id: 'sel', port: 'out' }, to: { id: 'mux', port: 'sel' } },
                { from: { id: 'mux', port: 'out' }, to: { id: 'out', port: 'in' } }
            ]
        };
    },

    // Step 10: Instruction Decoder
    step10: () => {
        return {
            devices: {
                instr: { type: 'NumEntry', bits: 2, label: 'OPCODE', attributes: { position: { x: 50, y: 100 } } },
                split: { type: 'BusUngroup', groups: [1, 1], attributes: { position: { x: 150, y: 100 } } },
                not0: { type: 'Not', bits: 1, attributes: { position: { x: 250, y: 50 } } },
                not1: { type: 'Not', bits: 1, attributes: { position: { x: 250, y: 150 } } },
                is_00: { type: 'And', bits: 1, label: 'LOAD', attributes: { position: { x: 350, y: 20 } } },
                is_01: { type: 'And', bits: 1, label: 'ADD', attributes: { position: { x: 350, y: 80 } } },
                is_10: { type: 'And', bits: 1, label: 'SUB', attributes: { position: { x: 350, y: 140 } } },
                is_11: { type: 'And', bits: 1, label: 'JMP', attributes: { position: { x: 350, y: 200 } } }
            },
            connectors: [
                { from: { id: 'instr', port: 'out' }, to: { id: 'split', port: 'in' } },
                { from: { id: 'split', port: 'out0' }, to: { id: 'not0', port: 'in' } },
                { from: { id: 'split', port: 'out1' }, to: { id: 'not1', port: 'in' } },
                { from: { id: 'not1', port: 'out' }, to: { id: 'is_00', port: 'in1' } }, { from: { id: 'not0', port: 'out' }, to: { id: 'is_00', port: 'in2' } },
                { from: { id: 'not1', port: 'out' }, to: { id: 'is_01', port: 'in1' } }, { from: { id: 'split', port: 'out0' }, to: { id: 'is_01', port: 'in2' } },
                { from: { id: 'split', port: 'out1' }, to: { id: 'is_10', port: 'in1' } }, { from: { id: 'not0', port: 'out' }, to: { id: 'is_10', port: 'in2' } },
                { from: { id: 'split', port: 'out1' }, to: { id: 'is_11', port: 'in1' } }, { from: { id: 'split', port: 'out0' }, to: { id: 'is_11', port: 'in2' } }
            ]
        };
    },

    // Step 11: Program Counter
    step11: () => {
        return {
            devices: {
                clk: { type: 'Clock', label: 'CLK', attributes: { position: { x: 50, y: 100 } } },
                rst: { type: 'Button', label: 'RESET', attributes: { position: { x: 50, y: 200 } } },
                pc: { type: 'Dff', bits: 4, label: 'PC', polarity: { clock: true, arst: true }, attributes: { position: { x: 200, y: 150 } } },
                inc: { type: 'Addition', bits: { in1: 4, in2: 4, out: 4 }, attributes: { position: { x: 350, y: 80 } } },
                one: { type: 'Constant', bits: 4, constant: '0001', attributes: { position: { x: 300, y: 50 } } },
                out: { type: 'NumDisplay', bits: 4, attributes: { position: { x: 200, y: 250 } } }
            },
            connectors: [
                { from: { id: 'clk', port: 'out' }, to: { id: 'pc', port: 'clk' } },
                { from: { id: 'rst', port: 'out' }, to: { id: 'pc', port: 'arst' } },
                { from: { id: 'pc', port: 'out' }, to: { id: 'inc', port: 'in1' } },
                { from: { id: 'one', port: 'out' }, to: { id: 'inc', port: 'in2' } },
                { from: { id: 'inc', port: 'out' }, to: { id: 'pc', port: 'in' } },
                { from: { id: 'pc', port: 'out' }, to: { id: 'out', port: 'in' } }
            ]
        };
    },

    // Step 12: ROM
    step12: () => {
        return {
            devices: {
                addr: { type: 'NumEntry', bits: 2, label: 'ADDR', attributes: { position: { x: 50, y: 100 } } },
                w0: { type: 'Constant', bits: 4, constant: '0101', attributes: { position: { x: 200, y: 30 } } },
                w1: { type: 'Constant', bits: 4, constant: '0011', attributes: { position: { x: 200, y: 80 } } },
                w2: { type: 'Constant', bits: 4, constant: '0010', attributes: { position: { x: 200, y: 130 } } },
                w3: { type: 'Constant', bits: 4, constant: '0000', attributes: { position: { x: 200, y: 180 } } },
                mux: { type: 'Mux', bits: { in: 4, sel: 2 }, attributes: { position: { x: 350, y: 100 } } },
                out: { type: 'NumDisplay', bits: 4, attributes: { position: { x: 500, y: 100 } } }
            },
            connectors: [
                { from: { id: 'addr', port: 'out' }, to: { id: 'mux', port: 'sel' } },
                { from: { id: 'w0', port: 'out' }, to: { id: 'mux', port: 'in0' } },
                { from: { id: 'w1', port: 'out' }, to: { id: 'mux', port: 'in1' } },
                { from: { id: 'w2', port: 'out' }, to: { id: 'mux', port: 'in2' } },
                { from: { id: 'w3', port: 'out' }, to: { id: 'mux', port: 'in3' } },
                { from: { id: 'mux', port: 'out' }, to: { id: 'out', port: 'in' } }
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
