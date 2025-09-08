
//获取上个月 20250801
export const getLastMonth = (): string => {

    const today = new Date();
    today.setMonth(today.getMonth() - 1);
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
     // Always use the first day of the month
    const currentMonth = `${year}${month}01`;
    return currentMonth;

  };


//获取本月 20250801

export const getCurrentMonth = (): string => {

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  //Always use the first day of the month
  const currentMonth = `${year}${month}01`;
  return currentMonth;

};

//获取下个月 20250801

export const getNextMonth = (start_date: string): string => {

  // Calculate the end date (next month of start_date)
    const startYear = parseInt(start_date.substring(0, 4));
    const startMonth = parseInt(start_date.substring(4, 6));
    // Calculate next month and handle year rollover
    let endMonth = startMonth + 1;
    let endYear = startYear;
    if (endMonth > 12) {
      endMonth = 1;
      endYear += 1;
    }
    //Format the end date as YYYYMMDD
    const endDate = `${endYear}${endMonth.toString().padStart(2, '0')}01`;
    return endDate;
}

export const shortStringFromDate =(date:Date): string =>{

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const str = `${year}${month}${day}`;
  return str

}





  