const getDayAndMonth = (): { day: number; month: string } => {
  const currentDate = new Date();

  const day = currentDate.getDate();
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  const month = monthNames[currentDate.getMonth()];

  return { day, month };
};

export const DataAtual = getDayAndMonth();
