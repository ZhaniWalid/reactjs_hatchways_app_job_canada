import React from 'react';
// Use this cmd: 'npm install --save enzyme react-test-renderer enzyme-adapter-react-16' in the 'Integrated Terminal of VS CODE' or 'Terminal of Windows' to install it
// 'enzyme' => allows us to just render a component standalone, independent from the entire react app
//          => we can write 'unit test' / 'isolated test'
import { configure, shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AlignItemsList from './hatchwaysStudentsCmpLst';

// Connect 'enzyme' to the 'Adapter'
configure({adapter: new Adapter()});

// Unit Test(s) Helpers Links:
//    https://enzymejs.github.io/enzyme/
//    https://www.toptal.com/react/tdd-react-unit-testing-enzyme-jest
//    https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675
//    https://www.syncfusion.com/blogs/post/unit-testing-in-react-with-jest-and-enzyme-frameworks.aspx
//    https://stackoverflow.com/questions/51534192/aftereach-and-beforeeach-only-for-describes/51535204


// describe('<AlignItemsList />'..) => that we will see on our console '<AlignItemsList />' when testing
describe('<AlignItemsList /> from [./hatchwaysStudentsCmpLst]', () => {
    // ': ShallowWrapper' => because 'shallow(...)' is a type of 'ShallowWrapper'
    let wrapper: ShallowWrapper;

    // Array of Students to be passed as a 'props' in the '<AlignItemsList />' cmp for test
    const myLinkedInProfilPic = 'https://media-exp1.licdn.com/dms/image/D4D35AQGn5uJsc65aew/profile-framedphoto-shrink_200_200/0/1626980854756?e=1639159200&v=beta&t=T6J44MOVsQT0gJFdXMnVNXqQPe1xoJWaILeWfZ-OIZQ';
    const arrayStdtsProps = [
      {
        city: 'Tunis, Tunisia',
        company: 'ADP',
        email: 'walid.zhani@adp.com',
        firstName: 'Walid',
        grades: ['75', '60', '55', '40', '95', '62', '41', '77'],
        id: '1',
        lastName: 'Zhani',
        pic: myLinkedInProfilPic,
        skill: 'JavaEE Web Developer',
        studTags: []
      },
      {
        city: 'Manouba, Tunisia',
        company: 'Ubisoft',
        email: 'walid.zhani@esprit.tn',
        firstName: 'Walid_',
        grades: ['85', '35', '62', '44', '97', '44', '21', '100'],
        id: '2',
        lastName: 'Zhani_',
        pic: myLinkedInProfilPic,
        skill: 'Unity Game Developer (C#)',
        studTags: []
      },
      {
        city: 'Bizerte, Tunisia',
        company: 'Zhani company limited',
        email: 'walid.zhani@gmail.com',
        firstName: 'Walid@',
        grades: ['55', '46', '22', '99', '78', '33', '64', '88'],
        id: '3',
        lastName: 'Zhani@',
        pic: myLinkedInProfilPic,
        skill: 'Cross-Platform Mobile Developer (Ionic/React)',
        studTags: []
      }
    ];
    //const changeFunc = jest.fn();

    //- 'beforeEach()' func => to be executed before each Test [= 'it()' block]
    //-- 'beforeAll()' func => to be executed before ALL Test(s) [= 'it()' block(s)]
    beforeAll(() => {
      // 'Shallow' rendering :: is useful to constrain yourself to testing a component as a unit
      //          => to ensure that your tests aren't indirectly asserting on behavior of child components.
      console.log('beforeAll - units test(s) started - [./hatchwaysStudentsCmpLst.tsx]');
      wrapper = shallow(<AlignItemsList hatchwaysApiStudents={() => {}}/>);     
    });
    
    //- 'afterEach()' func => to clean-up after each Test [= 'it()' block]
    // afterEach();
  
    // 'it()' => allows us to 'Write / Describe' one 'Individual test (takes 2 args)'
    it('Should render <AlignItemsList /> from [./hatchwaysStudentsCmpLst.tsx] when receiving props data from [./App.tsx]', () => {
      // 'Shallow' rendering :: is useful to constrain yourself to testing a component as a unit
      //          => to ensure that your tests aren't indirectly asserting on behavior of child components.
      //--- we can replace this 'wrapper = shallow(...)' line by the help of 'setProps()' helper method 
      //---       => of 'enzyme package' to add 'hatchwaysApiStudents' prop inside '<AlignItemsList />'
      ///// wrapper = shallow(<AlignItemsList hatchwaysApiStudents={arrayStdtsProps} />); 
      wrapper.setProps({ hatchwaysApiStudents: arrayStdtsProps });
      
      // 'expect' func => used every time you want to test a value. You will rarely call expect by itself.
      // 'find' func => Find every node in the render tree that matches the provided selector.
      // 'toMatchSnapshot' => To ensures that a value matches the most recent snapshot
      expect(wrapper).toMatchSnapshot();

      // arrayStdtsProps[1] OR [2].ToEqual({...}) => Will fail (and thats RIGHT)
      expect(arrayStdtsProps[0]).toEqual({
        city: 'Tunis, Tunisia',
        company: 'ADP',
        email: 'walid.zhani@adp.com',
        firstName: 'Walid',
        grades: ['75', '60', '55', '40', '95', '62', '41', '77'],
        id: '1',
        lastName: 'Zhani',
        pic: myLinkedInProfilPic,
        skill: 'JavaEE Web Developer',
        studTags: []
      });
      // arrayStdtsProps[0] OR [2].ToEqual({...}) => Will fail (and thats RIGHT)
      expect(arrayStdtsProps[1]).toEqual({ 
        city: 'Manouba, Tunisia',
        company: 'Ubisoft',
        email: 'walid.zhani@esprit.tn',
        firstName: 'Walid_',
        grades: ['85', '35', '62', '44', '97', '44', '21', '100'],
        id: '2',
        lastName: 'Zhani_',
        pic: myLinkedInProfilPic,
        skill: 'Unity Game Developer (C#)',
        studTags: []
      });
      // arrayStdtsProps[0] OR [1].ToEqual({...}) => Will fail (and thats RIGHT)
      expect(arrayStdtsProps[2]).toEqual({
        city: 'Bizerte, Tunisia',
        company: 'Zhani company limited',
        email: 'walid.zhani@gmail.com',
        firstName: 'Walid@',
        grades: ['55', '46', '22', '99', '78', '33', '64', '88'],
        id: '3',
        lastName: 'Zhani@',
        pic: myLinkedInProfilPic,
        skill: 'Cross-Platform Mobile Developer (Ionic/React)',
        studTags: []
      });
      
      console.log('wrapper.props() - [./hatchwaysStudentsCmpLst.tsx]: ', wrapper.props()); 
      console.log('wrapper.getElement() - [./hatchwaysStudentsCmpLst.tsx]: ', wrapper.getElement());
      console.log('wrapper.getElements() - [./hatchwaysStudentsCmpLst.tsx]: ', wrapper.getElements());         
    });

    it('Should write <h5 /> tag text of the number of students shown from total number', () => {
      const h5 = wrapper.find('h5');
      const h5Text = wrapper.find('h5').text();
      expect(h5).toHaveLength(1);
      expect(h5Text).toContain('Students (Showing ');

      console.log('h5: ', h5.html);
      console.log('h5 text: ', h5Text);

      // 'toMatchSnapshot' => To ensures that a value matches the most recent snapshot
      expect(wrapper).toMatchSnapshot();        
    });

    it('Should write <h4 /> tag text of the error message when there is no students to show (= 0)', () => {
      const h4 = wrapper.find('h4');
      const h4BoldErrorMsgTxt = wrapper.find('h4').find('b').text();
      expect(h4).toHaveLength(1);
      expect(h4BoldErrorMsgTxt).toContain('No student(s) found to show.');

      console.log('h4: ', h4.html);
      console.log('h4 Bold Error Message Text: ', h4BoldErrorMsgTxt);

      // 'toMatchSnapshot' => To ensures that a value matches the most recent snapshot
      expect(wrapper).toMatchSnapshot();        
    });

    it('Should find <p /> & <input /> tag(s)', () => {
      //wrapper.find('input').simulate('keydown', { keyCode: 32 });

      const p = wrapper.find('p');
      const inputSearchByName = wrapper.find('Search by name');
      const inputSearchByTag = wrapper.find('Search by tag');
      const inputAddTag = wrapper.find('Add a tag');

      console.log('p: ', p.html);
      console.log('Input search by name: ', inputSearchByName);
      console.log('Input search by tag: ', inputSearchByTag);
      console.log('Input add a tag: ', inputAddTag);

      // 'toMatchSnapshot' => To ensures that a value matches the most recent snapshot
      expect(wrapper).toMatchSnapshot();        
    });

    // 'afterAll()' func => to clean-up after ALL Test(s) [= 'it()' block(s)]
    afterAll(() => {
      console.log('afterAll - units test(s) finished - [./hatchwaysStudentsCmpLst.tsx]');
    });
  });