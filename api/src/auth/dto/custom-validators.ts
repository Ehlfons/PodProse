import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'validateDNI', async: false })
export class ValidateDNI implements ValidatorConstraintInterface {
  validate(DNI: string, args: ValidationArguments) {
    // Extraemos los dígitos numéricos del DNI
    const digitos = DNI.slice(0, -1);
    console.log(digitos);

    // Calculamos el resto de la división del número de DNI entre 23
    const resto = parseInt(digitos) % 23;
    console.log(resto);

    // Array con las letras asociadas a los restos de la división
    const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';

    // Obtenemos la letra correspondiente al resto obtenido
    const letraCalculada = letras.charAt(resto);

    // Comparamos la letra calculada con la letra proporcionada
    return letraCalculada === DNI.charAt(DNI.length - 1).toUpperCase();
  }

  defaultMessage(args: ValidationArguments) {
    return 'El DNI es inválido';
  }
}
