/**
 * 基礎組件工廠 (DigitalJS JSON Format Helpers)
 */

export const createId = (prefix) => `${prefix}_${Math.random().toString(36).substr(2, 9)}`;

export const Blocks = {
    // 基礎邏輯閘
    Gate: (type, bits = 1, label = "") => ({
        type: type.charAt(0).toUpperCase() + type.slice(1).toLowerCase(),
        bits: bits,
        label: label
    }),

    // 暫存器
    Register4Bit: (label = "REG") => ({
        type: 'Dff',
        bits: 4,
        label: label
    }),

    // 基礎全加器
    FullAdder: (bits = 4) => ({
        type: 'Adder',
        bits: bits,
        label: 'ADDER'
    }),

    // 三態緩衝器
    BusBuffer: (bits = 4) => ({
        type: 'BusBuffer',
        bits: bits,
        label: 'BUS_BUF'
    }),

    // 常數
    Constant: (value, bits = 4) => ({
        type: 'Constant',
        constant: value.toString(2).padStart(bits, '0'),
        bits: bits
    }),

    Input: (bits = 1, label = "") => ({ type: 'Input', bits: bits, label: label }),
    Output: (bits = 1, label = "") => ({ type: 'Output', bits: bits, label: label }),
    
    // 解碼器
    Decoder: (bits = 2) => ({
        type: 'Decoder',
        bits: bits,
        label: 'DEC'
    })
};
