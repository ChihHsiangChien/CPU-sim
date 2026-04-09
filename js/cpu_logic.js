import { Blocks, createId } from './blocks.js';
import { CONFIG } from './config.js';

/**
 * CPU/GPU 特化邏輯封裝 (符合 @spec.md)
 */

export const CpuModules = {
    // 4-bit ALU: 加法器 + Zero Flag 輸出
    ALU4Bit: () => {
        return {
            type: 'Subcircuit',
            label: '4-bit ALU',
            circuit: {
                devices: {
                    in1: { type: 'Input', bits: 4, label: 'A' },
                    in2: { type: 'Input', bits: 4, label: 'B' },
                    adder: { type: 'Adder', bits: 4, label: 'ADDER' },
                    zero_gate: { type: 'Nor', bits: 4, label: "ZeroDet" }, 
                    out: { type: 'Output', bits: 4, label: 'Y' },
                    zero_flag: { type: 'Output', bits: 1, label: 'ZF' }
                },
                connectors: [
                    { from: { id: 'in1', port: 'out' }, to: { id: 'adder', port: 'in1' } },
                    { from: { id: 'in2', port: 'out' }, to: { id: 'adder', port: 'in2' } },
                    { from: { id: 'adder', port: 'out' }, to: { id: 'out', port: 'in' } },
                    { from: { id: 'adder', port: 'out' }, to: { id: 'zero_gate', port: 'in' } },
                    { from: { id: 'zero_gate', port: 'out' }, to: { id: 'zero_flag', port: 'in' } }
                ],
                subcircuits: {}
            }
        };
    },

    // GPU Core: ALU + Register + Mask Logic + Tri-state Buffer
    GPUCore: (id) => {
        return {
            type: 'Subcircuit',
            label: `GPU Core ${id}`,
            circuit: {
                devices: {
                    clk: { type: 'Input', bits: 1, label: 'CLK' },
                    rst: { type: 'Input', bits: 1, label: 'RST' },
                    in_data: { type: 'Input', bits: 4, label: 'DATA_IN' },
                    add_sig: { type: 'Input', bits: 1, label: 'ADD' },
                    read_sig: { type: 'Input', bits: 1, label: 'READ' }, 
                    mask_sig: { type: 'Input', bits: 1, label: 'MASK' },
                    
                    reg: { type: 'Dff', bits: 4, label: 'ACC' },
                    alu: { type: 'Adder', bits: 4, label: 'ADDER' },
                    mask_gate: { type: 'And', bits: 1, label: "MASK_AND" },
                    tri_buf: { type: 'BusBuffer', bits: 4, label: 'TRI_BUF' },
                    
                    out_bus: { type: 'Output', bits: 4, label: 'BUS_OUT' }
                },
                connectors: [
                    { from: { id: 'reg', port: 'out' }, to: { id: 'alu', port: 'in1' } },
                    { from: { id: 'in_data', port: 'out' }, to: { id: 'alu', port: 'in2' } },
                    { from: { id: 'alu', port: 'out' }, to: { id: 'reg', port: 'in' } },
                    
                    { from: { id: 'mask_sig', port: 'out' }, to: { id: 'mask_gate', port: 'in1' } },
                    { from: { id: 'add_sig', port: 'out' }, to: { id: 'mask_gate', port: 'in2' } },
                    { from: { id: 'mask_gate', port: 'out' }, to: { id: 'reg', port: 'en' } },
                    
                    { from: { id: 'clk', port: 'out' }, to: { id: 'reg', port: 'clk' } },
                    { from: { id: 'rst', port: 'out' }, to: { id: 'reg', port: 'arst' } },
                    
                    { from: { id: 'reg', port: 'out' }, to: { id: 'tri_buf', port: 'in' } },
                    { from: { id: 'read_sig', port: 'out' }, to: { id: 'tri_buf', port: 'en' } },
                    { from: { id: 'tri_buf', port: 'out' }, to: { id: 'out_bus', port: 'in' } }
                ],
                subcircuits: {}
            }
        };
    },

    // Instruction Decoder (2-to-4)
    Decoder2to4: () => {
        return { type: 'Decoder', bits: 2, label: 'DEC' };
    }
};
