import React from 'react';
import { shallow, mount } from 'enzyme';

export const confirmElements = (element, View, props) => {
    const wrapper = mount(<View {...props} />)
    it('view contains ' + element, () => {
        expect(wrapper.find(element).exists()).toBe(true);
    });
    return wrapper.find(element).exists();
}

export const confirmElementsWrapper = (element, wrapper) => {
    it('view contains ' + element, () => {
        expect(wrapper.find(element).exists()).toBe(true);
    });
    return wrapper.find(element).exists();
}

export const generateProps = (props) => {
    const minProps = {
        ...props
    }
    return minProps;
}