import { useEffect, useState, useMemo } from 'react';
import { IDetallePrestamo, loanInfo, Persona, Prestamo } from '../Configs/interfaces';
import { usePrestamoStore, usePersonaStore } from '../store';

type LoanInfoWithDelay = loanInfo & {
  diasAtraso: number;
};

export const useLoans = () => {
  const { detallesPrestamo, prestamos, loadPrestamos } = usePrestamoStore();
  const { personas, loadPersonas } = usePersonaStore(); 
  const todayDate = new Date().toISOString().split('T')[0];
  const [todayLoans, setTodayLoans] = useState<loanInfo[]>([]);
  const [overdueLoans, setOverdueLoans] = useState<loanInfo[]>([]);
  const [unpaidLoans, setUnpaidLoans] = useState<loanInfo[]>([]);
  const [selectedLoan, setSelectedLoan] = useState<loanInfo | null>(null);

  useEffect(() => {
    loadPrestamos();
    loadPersonas(); 
  }, [loadPrestamos, loadPersonas]);

  const combineLoanInfo = (loan: IDetallePrestamo): loanInfo | null => {
    const prestamo = prestamos.find(p => p.idPrestamo === loan.idPrestamo);
    const person = personas.find(p => p.idPersona === prestamo?.idPersona);

    return prestamo && person ? { person, loan: prestamo, dues: loan } : null;
  };

  const processLoans = (filterFn: (loan: IDetallePrestamo) => boolean) => 
    detallesPrestamo
      .filter(filterFn)
      .map(combineLoanInfo)
      .filter((loan): loan is loanInfo => loan !== null);

  useEffect(() => {
    setTodayLoans(processLoans(loan => new Date(loan.fecha_couta.toString()).toISOString().split('T')[0] === todayDate));
    setOverdueLoans(processLoans(loan => new Date(loan.fecha_couta.toString()).toISOString().split('T')[0] < todayDate && loan.estado !== 6));
    setUnpaidLoans(processLoans(loan => new Date(loan.fecha_couta.toString()).toISOString().split('T')[0] <= todayDate && loan.estado !== 6));
  }, [detallesPrestamo, personas, prestamos, todayDate]);

  const totalPrestado = useMemo(() => prestamos.reduce((total, prestamo) => total + prestamo.monto_solicitado, 0), [prestamos]);

  const totalCobrado = useMemo(() => 
    detallesPrestamo.filter(loan => loan.estado === 6).reduce((total, loan) => total + loan.mont_capital, 0),
    [detallesPrestamo]
  );

  const balanceActual = useMemo(() => totalPrestado - totalCobrado, [totalPrestado, totalCobrado]);

  const totalIntereses = useMemo(() => 
    prestamos.reduce((total, prestamo) => total + (prestamo.tasa_interes * prestamo.monto_solicitado), 0),
    [prestamos]
  );

  const proximosPagos = useMemo(() => {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    return processLoans(loan => {
      const dueDate = new Date(loan.fecha_couta.toString());
      return dueDate > today && dueDate <= nextWeek;
    });
  }, [detallesPrestamo, prestamos, personas]);

  const prestamosSinPagos = useMemo(() => prestamos.filter(prestamo => !detallesPrestamo.some(loan => loan.idPrestamo === prestamo.idPrestamo)), [prestamos, detallesPrestamo]);

  const prestamosActivos = useMemo(() => prestamos.filter(prestamo => detallesPrestamo.some(dues => dues.idPrestamo === prestamo.idPrestamo && dues.estado !== 6)), [prestamos, detallesPrestamo]);

  const totalInteresesPagados = useMemo(() => 
    detallesPrestamo.filter(loan => loan.estado === 6).reduce((total, loan) => total + loan.mont_interes, 0),
    [detallesPrestamo]
  );

  const prestamoMasAntiguo = useMemo(() => 
    prestamos.reduce((oldest, prestamo) => new Date(prestamo.fecha_solicitud) < new Date(oldest.fecha_solicitud) ? prestamo : oldest, prestamos[0]),
    [prestamos]
  );

  const prestamoMasNuevo = useMemo(() => 
    prestamos.reduce((newest, prestamo) => new Date(prestamo.fecha_solicitud) > new Date(newest.fecha_solicitud) ? prestamo : newest, prestamos[0]),
    [prestamos]
  );

  const totalCuotasVencidas = useMemo(() => 
    detallesPrestamo.filter(loan => new Date(loan.fecha_couta.toString()) < new Date(todayDate) && loan.estado !== 6).reduce((total, loan) => total + loan.mont_capital, 0),
    [detallesPrestamo, todayDate]
  );

  const reportePagosAtrasados = useMemo(() => 
    detallesPrestamo.filter(loan => new Date(loan.fecha_couta.toString()).toISOString().split('T')[0] < todayDate && loan.estado !== 6)
      .map(loan => ({
        ...combineLoanInfo(loan),
        diasAtraso: Math.floor((new Date(todayDate).getTime() - new Date(loan.fecha_couta.toString()).getTime()) / (1000 * 60 * 60 * 24))
      }))
      .filter((loan): loan is LoanInfoWithDelay => loan !== null),
    [detallesPrestamo, personas, prestamos, todayDate]
  );

  const prestamosPorFecha = (startDate: string, endDate: string): loanInfo[] => 
    processLoans(loan => new Date(loan.fecha_couta.toString()) >= new Date(startDate) && new Date(loan.fecha_couta.toString()) <= new Date(endDate));

  const filtrarPrestamosPorPersona = (personaId: string): loanInfo[] => 
    processLoans(loan => prestamos.some(prestamo => prestamo.idPrestamo === loan.idPrestamo && prestamo.idPersona === personaId));

  return {
    CuotasVencidas: (loanId: string) => processLoans(loan => new Date(loan.fecha_couta.toString()).toISOString().split('T')[0] < todayDate && loan.estado !== 6 && loan.idPrestamo !== loanId),
    todayLoans,
    overdueLoans,
    unpaidLoans,
    setSelectedLoan,
    selectedLoan,
    totalPrestado,
    totalCobrado,
    balanceActual,
    totalIntereses,
    proximosPagos,
    prestamosSinPagos,
    prestamosActivos,
    totalInteresesPagados,
    prestamoMasAntiguo,
    prestamoMasNuevo,
    totalCuotasVencidas,
    reportePagosAtrasados,
    prestamosPorFecha,
    filtrarPrestamosPorPersona
  };
};
