const input = document.querySelector('.input');
const btn = document.querySelector('.btn');

class CPF {
    constructor(cpfRecebido) {
        Object.defineProperty(this, 'cpfLimpo', {
            enumerable: false,
            writable: false,
            configurable: false,
            value: cpfRecebido.replace(/\D+/g, '')
        })
    }

    isSequencia() { 
        return this.cpfLimpo.charAt(0).repeat(11) === this.cpfLimpo; 
    }

    geraNovoCpf() {
        const cpfSemDigitos = this.cpfLimpo.slice(0, -2);
        const digito1 = CPF.geraDigito(cpfSemDigitos);
        const digito2 = CPF.geraDigito(cpfSemDigitos + digito1);
        this.novoCPF = cpfSemDigitos + digito1 + digito2;
    }

    static geraDigito(cpfSemDigitos) {
        let total = 0;
        let reverso = cpfSemDigitos.length + 1; // contagem reversa do tamanho do cpf (11) caracteres
        for (let stringNumerica of cpfSemDigitos) {
            total += reverso * Number(stringNumerica);
            reverso--;
        }
        const digito = 11 - (total % 11);
        return digito <= 9 ? String(digito) : '0';
    }

    static mensagem(param) {
        limpaInput();
        if (param === false) {
            alert ('CPF Informado é inválido.');
        } else {
            alert ('CPF informado é válido.');
        }
    }

    valida() {
        if (!this.cpfLimpo) return CPF.mensagem(false);
        if (typeof this.cpfLimpo !== 'string') return CPF.mensagem(false);
        if (this.cpfLimpo.length !== 11) return CPF.mensagem(false);
        if (this.isSequencia()) return CPF.mensagem(false);
        this.geraNovoCpf();
        if (this.novoCPF === this.cpfLimpo) return CPF.mensagem(true);
        }
}

const cpf = new CPF(input.value);
btn.addEventListener('click', function() {
    const cpf = new CPF(input.value);
    cpf.valida()
});

function limpaInput() {
    input.value = '';
    input.focus();
}
