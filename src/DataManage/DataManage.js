/* eslint-disable no-nested-ternary */
export function transformData(data) {
  const groupedData = data.reduce((acc, curr) => {
    if (!acc[curr.Column_Name]) {
      acc[curr.Column_Name] = {
        Col_Id: curr?.Col_Id,
        Column_Name: curr?.Column_Name,
        Display_Type: curr?.Display_Type,
        Search_Criteria: curr?.Search_Criteria,
        data: curr.Display_Type === 'M' ? [{
          Cat_val_Id: curr.Cat_val_Id,
          Category_Value: curr.Category_Value,
          activeStatus: false,
        }] : (curr.Display_Type === 'S' ? [{
          Cat_val_Id: curr.Cat_val_Id,
          Key_To_Symbol: curr.Category_Value,
          activeStatus: null,
        }] : []),
        multiData: [],
        fromData: '',
        toData: '',
      };
    } else if (curr.Display_Type === 'M') {
      acc[curr.Column_Name].data.push({
        Cat_val_Id: curr.Cat_val_Id,
        Category_Value: curr.Category_Value,
        activeStatus: false,
      });
    } else if (curr.Display_Type === 'S') {
      acc[curr.Column_Name].data.push({
        Cat_val_Id: curr.Cat_val_Id,
        Key_To_Symbol: curr.Category_Value,
        activeStatus: false,
      });
    }
    return acc;
  }, {});

  return Object.values(groupedData);
}
