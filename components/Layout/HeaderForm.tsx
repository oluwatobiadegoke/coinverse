import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { AutoComplete } from "antd";
import { AiOutlineSearch } from "react-icons/ai";

import { Coin } from "../../interfaces";

type AutoCompleteProps = {
  coins: Coin[];
};

const HeaderForm: React.FC<AutoCompleteProps> = (coins) => {
  const router = useRouter();
  const [options, setOptions] = useState(coins.coins);

  //Executes when there is any change in the input value
  const handleChange = (value: string) => {
    if (value.length < 1) {
      setOptions(coins.coins);
    }
    const filteredCoins = coins.coins.filter((coin) => {
      return coin.name.toLowerCase().includes(value.toLowerCase());
    });
    setOptions(filteredCoins);
  };

  //Executes when one of the options in the dropdown is selected
  const handleSelect = (value: string) => {
    options.map((selected) => {
      selected.name === value ? router.push(`/coin/${selected.id}`) : null;
    });
  };

  return (
    <div className="flex-1 flex justify-end font-lato">
      <AutoComplete
        options={options}
        onChange={(value: string) => handleChange(value)}
        onSelect={(value: string) => handleSelect(value)}
        value=""
      >
        <div className="flex items-center bg-gray-50 gap-2 px-4 rounded-2xl shadow">
          <AiOutlineSearch />
          <input
            className="w-96 h-8 bg-transparent text-sm font-light text-gray-600 outline-none"
            placeholder="Search for a coin"
            id="search"
          />
        </div>
      </AutoComplete>
    </div>
  );
};

export default HeaderForm;
