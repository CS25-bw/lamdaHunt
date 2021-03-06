
"""CPU functionality."""

import sys

# Hardcoding variables for branch table
LDI = 0b10000010
PRN = 0b01000111
MUL = 0b10100010
ADD = 0b10100000
HLT = 0b00000001
POP = 0b01000110
PUSH = 0b01000101
CALL = 0b01010000
RET = 0b00010001
CMP = 0b10100111
JMP = 0b01010100
JEQ = 0b01010101
JNE = 0b01010110
SP = 7 # R7 Stack Pointer
class CPU:
    """Main CPU class."""

    def __init__(self):
        """Construct a new CPU."""
        self.ram = [0] * 256  # Ram with size of 256 bytes
        self.reg = [0] * 8
        # Below are Internal Registers
        self.pc = 0  # Program Counter
        self.ir = "00000000"
        # Added instructions set
        self.instruction = {}
        self.instruction[LDI] = self.handle_LDI
        self.instruction[PRN] = self.handle_PRN
        self.instruction[MUL] = self.handle_MUL
        self.instruction[POP] = self.handle_POP
        self.instruction[PUSH] = self.handle_PUSH
        self.instruction[CALL] = self.handle_CALL
        self.instruction[RET] = self.handle_RET
        self.instruction[ADD] = self.handle_ADD
        self.instruction[CMP] = self.handle_CMP
        self.instruction[JMP] = self.handle_JMP
        self.instruction[JEQ] = self.handle_JEQ
        self.instruction[JNE] = self.handle_JNE



# Functions for RAM read/write


    def ram_read(self, address):
        return self.ram[address]

    def ram_write(self, address, value):
        self.ram[address] = value

    def load(self, program):
        """Load a program into memory."""

        address = 0
        # For now, we've just hardcoded a program:

        program = [

                0o01101111010010000000000110000010000000010111010101001000000000011000001000000001011100100100100000000001100000100000000100100000010010000000000110000010000000010110001101001000000000011000001000000001011011110100100000000001100000101000001000000001010011010100100000000001100000100000000101101001010010000000000110000010000000010110111001001000000000011000001000000001011001010100100000000001100000100000000100100000010010000000000110000010000000010111100101001000000000011000001000000001

            ]

        for instruction in program:
            self.ram[address] = instruction
            address += 1

    def alu(self, op, reg_a, reg_b):
        """ALU operations."""

        if op == "ADD":
            self.reg[reg_a] += self.reg[reg_b]
        # elif op == "SUB": etc
        elif op == "MUL":
            self.reg[reg_a] *= self.reg[reg_b]
        elif op == "CMP":
            if self.reg[reg_a] == self.reg[reg_b]:
                self.fl = 0b00000001
            elif self.reg[reg_a] < self.reg[reg_b]:
                self.fl = 0b00000100
            elif self.reg[reg_a] > self.reg[reg_b]:
                self.fl = 0b00000010
            else:
                self.fl = 0b00000000
     
        else:
            raise Exception("Unsupported ALU operation")

    def trace(self):
        """
        Handy function to print out the CPU state. You might want to call this
        from run() if you need help debugging.
        """

        print(f"TRACE: %02X | %02X %02X %02X |" % (
            self.pc,
            # self.fl,
            # self.ie,
            self.ram_read(self.pc),
            self.ram_read(self.pc + 1),
            self.ram_read(self.pc + 2)
        ), end='')

        for i in range(8):
            print(" %02X" % self.reg[i], end='')

        print()

    def handle_LDI(self, operand_a, operand_b):
        self.reg[operand_a] = operand_b
        self.pc += 3

    def handle_PRN(self, operand_a, operand_b):
        print(f"Print to Console - {self.reg[operand_a]}")
        self.pc += 2
    def handle_MUL(self, operand_a, operand_b):
        self.alu("MUL", operand_a, operand_b)
        self.pc += 3  
    
    def handle_ADD(self,operand_a,operand_b):
        self.alu('ADD', operand_a,operand_b)
        self.pc +=3
         
    def handle_POP(self, operand_a, operand_b):
        value = self.ram[self.reg[SP]]
        self.reg[operand_a] = value
        self.reg[SP] += 1
        self.pc += 2

    def handle_PUSH(self, operand_a, operand_b):
        value = self.reg[operand_a]
        self.reg[SP] -= 1
        self.ram[self.reg[SP]] = value
        self.pc += 2
    
    def handle_CALL(self,operand_a,operand_b):
        value = self.pc +2
        self.reg[SP] -=1
        self.ram[self.reg[SP]] = value
        subroutine_address = self.reg[operand_a]
        self.pc = subroutine_address
    
    def handle_RET(self, operand_a, operand_b):
        return_address = self.reg[SP]
        self.reg[SP] += 1
        self.pc = self.ram[return_address]
        
    def handle_CMP(self, operand_a, operand_b):
        self.alu("CMP", operand_a, operand_b)
        self.pc += 3

    def handle_JMP(self, operand_a, operand_b):
        self.pc = self.reg[operand_a]

    def handle_JEQ(self, operand_a, operand_b):
        if self.fl == 0b00000001:
            self.handle_JMP(operand_a, operand_b)
        else:
            self.pc += 2

    def handle_JNE(self, operand_a, operand_b):
        if self.fl == 0b00000100:
            self.handle_JMP(operand_a, operand_b)
        else:
            self.pc += 2
    
 


    def run(self):
        """Run the CPU."""
        # Perform REPL style execution
        running = True
        # Before the loop starts, initialize stack pointer
        self.reg[SP] = 0xF4
        while running:
            # Start the CPU. start storing instructions in IR
            self.ir = self.ram_read(self.pc)
            operand_a = self.ram_read(self.pc+1)
            operand_b = self.ram_read(self.pc+2)

         
            if self.ir == HLT:
                running = False
                break
            # try to engage the reads from program and excecute instructions
            try:
                self.instruction[self.ir](operand_a, operand_b)
            except:
                print(f"Error: Unknown Command {self.ir}")
                sys.exit(1)

