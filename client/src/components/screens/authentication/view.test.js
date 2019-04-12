import React from 'react';
import { shallow, mount } from 'enzyme';
import { confirmElements, confirmElementsWrapper, generateProps } from '../../../tests/utils/viewUtils';

import View from "./view";

const e = [
    '.loginForm',
    '.formHeader',
    '.inputRow',
    '.loginButtons',
];

const props = {
};

describe('Reports Page elements', () => {
    e.every(element => confirmElements(element, View, generateProps(props)));
});