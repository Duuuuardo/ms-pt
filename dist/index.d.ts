declare type Unit = 'Anos' | 'Ano' | 'A' | 'Semanas' | 'Semana' | 'Sem' | 'Dias' | 'Dia' | 'D' | 'Horas' | 'Hora' | 'Hrs' | 'Hr' | 'H' | 'Minutos' | 'Minuto' | 'Mins' | 'Min' | 'Segundos' | 'Segundo' | 'Seg' | 's' | 'Milisegundos' | 'Milisegundo' | 'Ms';
declare type UnitAnyCase = Unit | Uppercase<Unit> | Lowercase<Unit>;
export declare type StringValue = `${number}` | `${number}${UnitAnyCase}` | `${number} ${UnitAnyCase}`;
interface Options {
    /**
     * Set to `true` to use verbose formatting. Defaults to `false`.
     */
    long?: boolean;
}
/**
 * Parse or format the given value.
 *
 * @param value - The string or number to convert
 * @param options - Options for the conversion
 * @throws Error if `value` is not a non-empty string or a number
 */
declare function msFn(value: StringValue, options?: Options): number;
declare function msFn(value: number, options?: Options): string;
export default msFn;
