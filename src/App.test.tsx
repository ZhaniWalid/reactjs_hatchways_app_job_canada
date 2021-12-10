import React from 'react';
//-- import { render, screen } from '@testing-library/react';

// Use this cmd: 'npm install --save enzyme react-test-renderer enzyme-adapter-react-16' in the 'Integrated Terminal of VS CODE' or 'Terminal of Windows' to install it
// 'enzyme' => allows us to just render a component standalone, independent from the entire react app
//          => we can write 'unit test' / 'isolated test'
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import AlignItemsList from './Components/ItemsList/hatchwaysStudentsCmpLst';

// Connect 'enzyme' to the 'Adapter'
configure({adapter: new Adapter()});

// Unit Test(s) Helpers Links:
//    https://enzymejs.github.io/enzyme/
//    https://www.toptal.com/react/tdd-react-unit-testing-enzyme-jest
//    https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675
//    https://www.syncfusion.com/blogs/post/unit-testing-in-react-with-jest-and-enzyme-frameworks.aspx
//    https://stackoverflow.com/questions/51534192/aftereach-and-beforeeach-only-for-describes/51535204


// Default unit test --- I used 'enzyme' & 'jest' instead of it
/* test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
}); */

// describe('<App />'..) => that we will see on our console '<App />' when testing
describe('<App />', () => {
  // ': ShallowWrapper' => because 'shallow(...)' is a type of 'ShallowWrapper'
  let wrapper: ShallowWrapper; 

  //- 'beforeEach()' func => to be executed before each Test [= 'it()' block]
  beforeEach(() => {
    // 'Shallow' rendering :: is useful to constrain yourself to testing a component as a unit
    //          => to ensure that your tests aren't indirectly asserting on behavior of child components.
    console.log('beforeEach - one unit test is started - [./App.tsx]');
    wrapper = shallow(<App />);
  });
  
  // 'it()' => allows us to 'Write / Describe' one 'Individual test (takes 2 args)'
  it('Should render <App /> when receiving data from Hatchways API', () => {
    // 'toMatchSnapshot' => To ensures that a value matches the most recent snapshot
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(AlignItemsList)).toHaveLength(1);

    // console.log('wrapper: ', wrapper);
    // console.log('wrapper.getElements(): ', wrapper.getElements()); 
    console.log('wrapper.getElement() - [./App.tsx]: ', wrapper.getElement());
     
  });

  // 'afterEach()' func => to clean-up after each Test [= 'it()' block] 
  afterEach(() => {
    console.log('afterEach - one unit test is finished - [./App.tsx]');
  });
});