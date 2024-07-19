import { LoanDetail, loanWhitDues } from "../Configs";
import { IDetallePrestamo } from "../Configs/interfaces";
import { getNextId } from "../Configs/realmConfig";
import calcularFechaCuota from "./calcularFechaCuota";

async function calcularDetallesCuotas(loanHeader: loanWhitDues, diaPago: number = 0) {
    const nextID = await getNextId();
    const resultArray = createArrayFromNumber(nextID, loanHeader.loan.cant_coutas);
    const Amount = loanHeader.loan.monto_solicitado;
    const Interest = loanHeader.loan.tasa_interes;
    const Dues = loanHeader.loan.cant_coutas;
    const FrequencyId = loanHeader.loan.tipo_prestamo;
    const Start_date = loanHeader.loan.fecha_inicioPrestamo;
    const StateId = 3;
    const LoanId = loanHeader.loan.idPrestamo;

    // Arreglo para almacenar los detalles de las cuotas
    const cuotas: IDetallePrestamo[] = [];
    let payTotalAmount = 0;
    let payTotalInterest = 0;
    let payDuesAmount = 0;

    // Calcular los valores necesarios para cada cuota
    for (let cuotaNumero = 1; cuotaNumero <= Dues; cuotaNumero++) {
        let duesAmount = Math.floor(Amount / Dues); // Redondear hacia abajo el monto de cada cuota
        const totalInterest = Math.floor((Amount * Interest) / 100); // Redondear hacia abajo el total de interés por cuota
        let totalAmount = duesAmount + totalInterest; // Monto total por cuota

        // Ajustar el último pago para igualar el monto original del préstamo
        if (cuotaNumero === Dues) {
            const amountRemaining = Amount - payDuesAmount - duesAmount;
            duesAmount += amountRemaining;
        }

        const fechaVen = await calcularFechaCuota(Start_date, cuotaNumero, FrequencyId, diaPago);
        // Crear objeto con los valores calculados
        const loanDetailValues: IDetallePrestamo = {
            idDetallePrestamo: resultArray[cuotaNumero - 1], // Adjusted indexing
            idPrestamo: LoanId,
            num_cuota: cuotaNumero,
            mont_couta: totalAmount,
            mont_capital: duesAmount,
            mont_interes: totalInterest,
            fecha_couta: await calcularFechaCuota(Start_date, cuotaNumero, FrequencyId, diaPago),
            fecha_venc: await calcularFechaCuota(fechaVen, cuotaNumero, FrequencyId, diaPago), // Sumar 1 día para el vencimiento de la cuota (para tener en cuenta los días festivos)
            estado: StateId,
        };

        payTotalAmount += duesAmount;
        payTotalInterest += totalInterest;
        payDuesAmount += duesAmount;

        // Agregar el detalle de la cuota al arreglo
        cuotas.push(loanDetailValues);
    }

    return {
        cuotas,
        payTotalAmount,
        payTotalInterest,
        payDuesAmount
    };
}

function createArrayFromNumber(startNumber: number, size: number) {
    return Array.from({ length: size }, (_, index) => startNumber + index + 1);
}

export default calcularDetallesCuotas;
