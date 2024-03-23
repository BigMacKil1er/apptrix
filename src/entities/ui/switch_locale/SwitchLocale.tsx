import { FormControl, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { locale } from "../../../app/locales";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

export const SwitchLocale = () => {
    const {i18n} = useTranslation()
    const [leng, setLeng] = useState<string | undefined>('')
    function handleChange(event:SelectChangeEvent<string>) {
        setLeng(event.target.value)
        i18n.changeLanguage(event.target.value)
    }
    useEffect(()=>{
        setLeng(i18n.resolvedLanguage)
    },[i18n])
    return (
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={leng}
          onChange={handleChange}
        >
          <MenuItem value={'ru'}>{locale.ru.title}</MenuItem>
          <MenuItem value={'en'}>{locale.en.title}</MenuItem>
        </Select>
      </FormControl>
    );
};