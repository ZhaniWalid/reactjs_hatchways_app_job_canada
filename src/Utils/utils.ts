/** Concatinate the "first name" with the "last name" to get the "full name" of a Student
 *  as a result.
 *  @param firstName
 *  @param lastName
 *  @return fullName
 *  @author Walid Zhani 
 *  @link https://www.linkedin.com/in/walid-zhani-54705612a/ 
 * */
export const strConcatFirstNameLastName = (firstName: string, lastName: string) => {
    const fullName = firstName+ ' '+ lastName;
    return fullName;
};

/** Calculate the average of grades.
 * @param arrGradesString
 * @return avgGrades
 * @author Walid Zhani
 * @link https://www.linkedin.com/in/walid-zhani-54705612a/
 * */
export const calculateAvgGrades = (arrGradesString: string[]) => {
    // Convert the 'Array of Grades' (arrGradesString) from 'string[]' to 'number[]' (arrGradesInt)
    const arrGradesInt = arrGradesString.map(grade => Number(grade));
    // Calculate sum of all elements (grades) in the array (arrGradesInt)
    const sumGrades = arrGradesInt.reduce((a, b) => a + b, 0);
    // Calculate the average of all elements (grades) in the array (arrGradesInt)
    const avgGrades = (sumGrades / arrGradesInt.length) || 0;
    
    return avgGrades+ '%';
};

/** Render the value of the prop "aria-controls" in the component "< AccordionSummary />" inside it's
 *  parent component "< Accordion />" who is in turn inside it's parent component "< List />".
 *  Example of "aria-controls":  
 *  aria-controls = 'panel1bh-content' | aria-controls = 'panel2bh-content'
 * @param idAriaControl
 * @return ariaControlContent
 * @author Walid Zhani
 * @link https://www.linkedin.com/in/walid-zhani-54705612a/
 * @description https://mui.com/components/accordion/
 * */
export const ariaControlsAccordionSummaryByElement = (idAriaControl: string) => {
    // Example of 'ariaControls' : 'panel1bh-content'
    const ariaControlContent = 'panel'+ idAriaControl+ 'bh-content';
    return ariaControlContent;
};

/** Render the value of the prop "id" in the component "< AccordionSummary />" inside it's
 *  parent component "< Accordion />" who is in turn inside it's parent component "< List />".
 *  Example of "id":  
 *  id = 'panel1bh-header' | id = 'panel2bh-header'
 * @param idAccordionSummary
 * @return idHeader
 * @author Walid Zhani
 * @link https://www.linkedin.com/in/walid-zhani-54705612a/
 * @description https://mui.com/components/accordion/
 * */
export const idAccordionSummaryByElement = (idAccordionSummary: string) => {
    // Example of 'id' of 'Accordion Summary' : 'panel1bh-header'
    const idHeader = 'panel'+ idAccordionSummary+ 'bh-header';
    return idHeader;
};