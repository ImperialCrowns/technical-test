import { ReactElement} from 'react';
import {
    Input,
    InputGroup,
    InputLeftElement,
  } from "@chakra-ui/react";
import { SearchIcon } from '@chakra-ui/icons';

export const SearchBar = (props: {placeholder: string, value: string, setValue: (value: string) => void}): ReactElement => {
    return (
        <InputGroup>
            <InputLeftElement
                pointerEvents="none"
                color="darkgray"
                children={<SearchIcon/>}
            />
            <Input
                type="search"
                size="md"
                variant="outline"
                placeholder={props.placeholder}
                value={props.value}
                onChange={(e) => props.setValue(e.target.value)}
            />
        </InputGroup>
    );
}