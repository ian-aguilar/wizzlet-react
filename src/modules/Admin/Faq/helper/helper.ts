export const appendFormData = (
  data: any,
  formdata: FormData,
  parentKey: string = ""
) => {
  Object.keys(data).forEach((key) => {
    const mainKey = parentKey ? `${parentKey}[${key}]` : key;

    if (data[key] instanceof FileList) {
      formdata.append(mainKey, data[key][0]);
    } else if (typeof data[key] === "object") {
      appendFormData(data[key], formdata, mainKey);
    } else if (Array.isArray(data[key])) {
      data[key].forEach((item: any, index: number) => {
        appendFormData(item, formdata, `${mainKey}[${index}]`);
      });
    } else {
      formdata.append(mainKey, data[key]);
    }
  });
};
