import { SearchOutlined } from "@ant-design/icons";
import { Button, Tooltip } from "antd";

type WooparooSearchButtonProps = {
  onClick: () => void;
};

const WooparooSearchButton = ({ onClick }: WooparooSearchButtonProps) => (
  <div>
    <Tooltip title="카운터 우파루 검색하기">
      <Button icon={<SearchOutlined />} onClick={onClick}>
        카운터 확인!
      </Button>
    </Tooltip>
  </div>
);

export default WooparooSearchButton;
