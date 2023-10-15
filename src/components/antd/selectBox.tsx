import { Select } from "antd";
import wooparooData from "@/assets/database/data.json";

type SelectBoxProps = {
  placeholder: string;
  setSelected: (value: string) => void;
};

type selectOptionsType = {
  value: string;
  label: string;
};

const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

const makeSelectBoxLabel = (
  selectOptions: selectOptionsType[],
  wooparooData: any
) => {
  for (const wooparoo of wooparooData) {
    let label: string = wooparoo.이름 + " (";
    if (wooparoo.메인 !== "공백") label += wooparoo.메인;
    if (wooparoo.보조1 !== "공백") label += ", " + wooparoo.보조1;
    if (wooparoo.보조2 !== "공백") label += ", " + wooparoo.보조2;
    label += ")";

    selectOptions.push({
      value: label,
      label: label,
    });
  }
};

const SelectBox = ({ placeholder, setSelected }: SelectBoxProps) => {
  const onChange = (value: string) => {
    setSelected(value);
  };

  const onSearch = (value: string) => {
    setSelected(value);
  };

  let selectOptions: selectOptionsType[] = [];
  makeSelectBoxLabel(selectOptions, wooparooData);

  return (
    <Select
      showSearch
      placeholder={placeholder}
      optionFilterProp="children"
      onChange={onChange}
      onSearch={onSearch}
      filterOption={filterOption}
      options={selectOptions}
    />
  );
};

export default SelectBox;
