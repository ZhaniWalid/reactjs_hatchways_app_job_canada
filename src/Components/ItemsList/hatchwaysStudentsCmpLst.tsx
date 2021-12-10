import React, { useEffect, useState } from "react";
import { 
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Avatar, 
    CircularProgress, 
    createTheme, 
    Input, 
    List, 
    ListItem, 
    ListItemAvatar, 
    ListItemText, 
    Paper, 
    Stack, 
    ThemeProvider, 
    Typography 
} from "@mui/material"; // cmd: 'npm install @mui/material'
import { StudentInterface } from "../../Interfaces/hatchwaysApiInterfaces";
import { 
    ariaControlsAccordionSummaryByElement, 
    calculateAvgGrades, 
    idAccordionSummaryByElement, 
    strConcatFirstNameLastName 
} from "../../Utils/utils";
// cmd: 'npm install @mui/styles'
import { createStyles, makeStyles, styled } from "@mui/styles"; 
// cmd: 'npm install @mui/icons-material'
import PlusIcon from "@mui/icons-material/Add"; 
import MinusIcon from "@mui/icons-material/Remove";
import "./hatchwaysStudentsCmpLst.css";

// To override some of the default style in the cmp 'MuiTypography-root MuiTypography-body1' (<span />) 
// who contains the 'fullName' [strConcatFirstNameLastName(student.firstName, student.lastName)] 
// in the '<ListItemText />' cmp, we should override the 'body1' like below and then
// put the '<ListItemText />' cmp between the tag '<ThemeProvider theme={theme}> </ThemeProvider>' cmp
//    Tuto link: https://stackoverflow.com/questions/58829254/how-to-override-muitypography-body1-class-in-material-ui
const theme = createTheme({
    typography: {
        // 'MuiTypography-root MuiTypography-body1' (<span />)
        body1: {
            fontFamily: 'unset', // 'RalewayVariableFont',
            fontWeight: 'bolder',
            fontSize: 'xx-large',
            textTransform: 'uppercase'
        },
        // Same here for 'MuiTypography-root MuiTypography-body2' (<p /> == <Typography /> below)
        // who contains the 'studentDetails' (Email, Company, Company, Average)
        body2: {
            marginLeft: '15px',
            marginTop: '10px'
        }
    }
});

const useStyles = makeStyles(() =>
  createStyles({
    // This 'root' object [ className={classes.root} ] is replaced by the same "CSS properties" 
    // in the "sx={{ }}" Object in the "<List />" tag
    /* root: {
      width: '100%',
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper
    }, */
    inline: {
      display: 'inline'
    },
    studentFullName: {
      width: 'auto' // '300px'
    },
    studentDetails: {
      width: '300px'
    }
  })  
);

const Item = styled(Paper)((/* { theme } */) => ({
    //...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary
}));

const ariaLabelTag = { 'aria-label': 'description' };
const ariaLabelSearchTag = { 'aria-label': 'search' };
const ariaLabelSearchName = { 'aria-label': 'search' };

const AlignItemsList = (props: any) => {
    console.log('props - hatchwaysStudentsCmpLst.tsx: ', props);

    //--- Variables & States decalarations code part ---///
    const classes = useStyles();
    
    const [totalCountHatchwaysApiStdts, setTotalCountHatchwaysApiStdts] = useState(0);
    const [searchTextStudTag, setSearchTextStudTag] = useState('');
    const [searchTextStudFullName, setSearchTextStudFullName] = useState(''); 
    const [isStudentSearchNotFound, setIsStudentSearchNotFound] = useState(true);
    const [hatchwaysApiStdtsProps, setHatchwaysApiStdtsProps]: any = useState([]);
    const [isAccordionExpanded, setIsAccordionExpanded] = useState<number | false>(false);

    
    //--- Methods code parts ---//
    
    /** Handle the "Accordion(s)" changes behavior, when an Accordion is "Expanded" (Opened [MinusIcon]),
     *  The other one is "Collpased" (Closed [PlusIcon]) => "Controlled Accordion(s)".
     * @param event
     * @param isExpanded
     * @param studentID
     * @return void( )
     * @author Walid Zhani
     * @link https://www.linkedin.com/in/walid-zhani-54705612a/
     * @description https://mui.com/components/accordion/
     * */
     const handleAccordionChange = (event: any, isExpanded: boolean, studentID: number) => {
        //-- preventDefault() => To 'prevent' the 'reloading of the page'
        //event.preventDefault();

        setIsAccordionExpanded(isExpanded ? studentID : false);
    };

    /** Get the "value" of the "Tag" from the "< Input />" element, where we typed the text 
     *  (in the exact "index/studentID"), then append it to the array of tags ("studTags") who 
     *  is a property of the "Student" object And UPDATE it & then UPDATE the 
     *  State "hatchwaysApiStdtsProps" & paste also the "studentID" to the State "tagItemStudentID"
     *  to render instantly the "added/appended Tag(s)" to that specific student at that specific 
     *  "index/studentID" and then after the Enter button is clicked the "value" of tag of 
     *  the "< Input />" element is cleared (= " ").
     * @param event
     * @param studentID
     * @return void( )
     * @author Walid Zhani
     * @link https://www.linkedin.com/in/walid-zhani-54705612a/
     * @description Enter button clicked logic - https://stackoverflow.com/questions/43384039/how-to-get-the-textfield-value-when-enter-key-is-pressed-in-react
     * @description Append logic - https://www.skptricks.com/2018/06/append-or-prepend-html-using-reactjs.html
     * @description Casting "HTMLElement" to "HTMLInputElement" in TypeScript - https://www.typescripttutorial.net/typescript-tutorial/type-casting/
     * @description And get the value of the casted "< Input />" tag element - https://stackoverflow.com/questions/12989741/the-property-value-does-not-exist-on-value-of-type-htmlelement
     * @description And updating an array of objects & then update the State - https://dev.to/andyrewlee/cheat-sheet-for-updating-objects-and-arrays-in-react-state-48np?fbclid=IwAR0UW8k9asx-q427cZAaH2mUs1SVw6mgh5Ra6kKzoqn9k4_xuHqeyNFP-Bs
    */
    const addAppendTagItems = (event: any, studentID: string) => {
        // Find the ''EXACT'' 'index' of 'Student' by its 'ID' where we Clicked 'Enter' button  
        // when we 'finished typing' the 'Tag' text 'input' 
        const indexStudent = hatchwaysApiStdtsProps.findIndex(
            (elStudent: StudentInterface) => elStudent.id === studentID
        );

        // Use 'onKeyDown' event, and inside that 'check' the 'key code' of the 'key pressed by user'. 
        // 'Key code' of 'Enter' key is '13', check the code and put the logic there.
        // So => IF: 'keyCode === 13' THEN: the key pressed is the 'Enter' button.
        if(event.keyCode === 13) {
            if (event.target.value.length > 0) {
                // If the 'indexStudent !== -1' => the object is already found
                if (indexStudent !== -1) {
                    const txtInputValue: string = event.target.value;
                    console.log('addAppendTagItems - New Tag [', txtInputValue,  '] Added - Length [',
                        txtInputValue.length, '] - Student ID: [', studentID, ']'
                    );
                    
                    // Find the Student by 'id', that where we typed the 'tag' text
                    // and clicked the 'Enter' button
                    const studentToFind = hatchwaysApiStdtsProps.find((studEl: StudentInterface) => 
                        studEl.id === studentID
                    );
                    if (studentToFind !== undefined) {
                        //-- Steps to 'update' an array of objects & put the updated version
                        //-- to the State (hatchwaysApiStdtsProps)
                        //--    Link:  https://dev.to/andyrewlee/cheat-sheet-for-updating-objects-and-arrays-in-react-state-48np?fbclid=IwAR0UW8k9asx-q427cZAaH2mUs1SVw6mgh5Ra6kKzoqn9k4_xuHqeyNFP-Bs
                        
                        // Update the object (student) that we found above by 'Id/Index', by updating
                        // its 'studTags' array without making any changes to the rest of its props
                        // and then put it in a new object (studObjUpdated)
                        const studObjUpdated = { 
                            ...studentToFind, 
                            ...studentToFind.studTags.push(txtInputValue) 
                        };
                        
                        // Make a 'shallow copy' of the existing 'hatchwaysApiStdtsProps' State array
                        const newHatchwaysApiStdtsProps = [...hatchwaysApiStdtsProps];
                        // Make the update => by putting the 'updated object' at the specific 'index'
                        newHatchwaysApiStdtsProps[indexStudent] = studObjUpdated;
                        // Update the State (hatchwaysApiStdtsProps)
                        setHatchwaysApiStdtsProps(newHatchwaysApiStdtsProps);
                    }
                    console.log('addAppendTagItems - student.studTags : ', studentToFind.studTags);
                    
                    // The 'HTMLElement' should be casted to 'HTMLInputElement', to be able To access
                    // the value of the <Input /> tag element and change it, in this manner:
                    //      const x = document.getElementById(id) as HTMLInputElement; -- Cast it
                    //      x.value -- Access the value & change it if you want to
                    // Thanks to 'TypeScript' that let us do it... Links tutos:
                    //      https://www.typescripttutorial.net/typescript-tutorial/type-casting/        
                    //      https://stackoverflow.com/questions/12989741/the-property-value-does-not-exist-on-value-of-type-htmlelement
                    const inputEl = document.getElementById(studentID) as HTMLInputElement;
                    console.log('document.getElementById(inputTag) : ', inputEl);
                    console.log('inputEl.value - before: ', inputEl.value);
                    if (inputEl !== null) {
                        console.log('if (inputEl !== null) : entered');
                        inputEl.value = '';
                        console.log('inputEl.value - after _ if (dc !== null) : ', inputEl.value);
                    }
                }    
            } 
        }
    };

    //--- useEffect() code parts ---//

    useEffect(() => {
        console.log('hatchwaysApiStdtsProps - useState on useEffect: ', hatchwaysApiStdtsProps);
    }, [hatchwaysApiStdtsProps]);

    useEffect(() => {
        // Filter with the 2 '<Input />' cmp ('by name' & 'by tag') search bars (text fields)
        //   IF: filtering ONLY by 'names' => get Results (length > 0) OR length = 0.
        //   ELSE IF: filtering ONLY by 'tags' => get Results (length > 0) OR length = 0.
        //   ELSE IF: filtering by BOTH of them 'names & notes' => get Results (length > 0) OR length = 0.
        //   ELSE: Do nothing => Return the Default Data.
        //      Inspired by:
        //          https://codesandbox.io/s/magical-payne-4387s?file=/src/App.js (Best Solution)
        //          https://stackoverflow.com/questions/70251477/how-to-to-filter-the-same-data-with-2-search-bars-reactjs
        if (searchTextStudFullName.length > 0 && searchTextStudTag.length > 0) {
            setHatchwaysApiStdtsProps(
                [...props.hatchwaysApiStudents]
                    .filter((studEl: StudentInterface) => {
                        let studentFullName = studEl.firstName+ ' '+  studEl.lastName;
                        if (studentFullName.toLowerCase().includes(searchTextStudFullName.toLowerCase())) {
                            return true;
                        }
                        return false;
                    })
                    .filter((studEl: StudentInterface) =>
                        studEl.studTags.some((tagEl) =>
                            tagEl.toLowerCase().includes(searchTextStudTag.toLowerCase())
                        )
                    )
            );
            
        } else if (searchTextStudFullName.length > 0) {
            setHatchwaysApiStdtsProps(
                [...props.hatchwaysApiStudents]
                    .filter((studEl: StudentInterface) => {
                        let studentFullName = studEl.firstName+ ' '+  studEl.lastName;
                        if (studentFullName.toLowerCase().includes(searchTextStudFullName.toLowerCase())) {
                            return true;
                        }
                        return false;
                    })
            );
        } else if (searchTextStudTag.length > 0) {
            setHatchwaysApiStdtsProps(
                [...props.hatchwaysApiStudents]
                    .filter((studEl: StudentInterface) =>
                        studEl.studTags.some((tagEl) =>
                            tagEl.toLowerCase().includes(searchTextStudTag.toLowerCase())
                        )
                    )
            );
        } else {
            setHatchwaysApiStdtsProps([...props.hatchwaysApiStudents]);
        }
              
    }, [props.hatchwaysApiStudents, searchTextStudFullName, searchTextStudTag]);

    useEffect(() => {
        hatchwaysApiStdtsProps.length === 0 
            ? setIsStudentSearchNotFound(false) 
            : setIsStudentSearchNotFound(true);
        setTotalCountHatchwaysApiStdts(hatchwaysApiStdtsProps.length);
    }, [hatchwaysApiStdtsProps.length]);

    useEffect(() => {
        console.log('isAccordionExpanded - useState on useEffect: ', isAccordionExpanded);
    }, [isAccordionExpanded]);

    return (
        <div className='div-parent-style'>
            <Input 
               fullWidth 
               placeholder='Search by name'
               inputProps={ariaLabelSearchName}
               value={searchTextStudFullName} 
               onChange={ev => setSearchTextStudFullName(ev.target.value)}
               sx={{ bgcolor: 'background.paper' }} 
            />
            <Input 
               fullWidth 
               placeholder='Search by tag'
               inputProps={ariaLabelSearchTag}
               value={searchTextStudTag} 
               onChange={ev => setSearchTextStudTag(ev.target.value)}
               sx={{ bgcolor: 'background.paper' }} 
            />
            <h5 style={{              
                   marginTop: '0px',
                   marginBottom: '0px',
                   paddingTop: '7.5px',
                   color: 'mediumblue',
                   textAlign: 'initial',            
                   backgroundColor: '#fff'
                }}
            >
                Students (Showing {totalCountHatchwaysApiStdts ?? 0} out of&nbsp;
                {props.hatchwaysApiStudents.length})
            </h5>
            {props.hatchwaysApiStudents.length > 0 ? (
                <List
                    sx={{
                        width: '100%', 
                        maxWidth: '100%', 
                        bgcolor: 'background.paper', // = 'white'
                        paddingTop: 'unset', // default: '8px'
                        // To make this 'List' scrollable inside it's parent'Div'
                        overflowY: 'scroll',
                        height: '500px'  
                    }}
                >
                    <h4 key={'0'}
                        hidden={isStudentSearchNotFound}
                        style={{ 
                            color: 'red', 
                            backgroundColor: 'white' 
                        }} 
                    >
                        <b>No student(s) found to show.</b>
                    </h4>
                    {hatchwaysApiStdtsProps.map((student: StudentInterface) => (
                    <>
                        <Accordion
                            key={student.id} 
                            expanded={isAccordionExpanded === parseInt(student.id)}
                            onChange={(ev, expanded) => handleAccordionChange(
                                ev, expanded, parseInt(student.id)
                            )}
                            // boxShadow: 'none' => To 'hide the line' that appears at the end (bottom)
                            // of the 'box' of the 'Accordion'
                            sx={{ boxShadow: 'none' }}               
                        >
                            <AccordionSummary
                                key={(parseInt(student.id) * 10).toString()}                             
                                expandIcon={
                                    isAccordionExpanded === parseInt(student.id) 
                                        ? <MinusIcon 
                                            sx={{ 
                                              fontSize: '2.5rem',
                                              // Place the 'MinusIcon' to the top right corner
                                              top: '25px',
                                              right: '-25px',
                                              position: 'absolute' 
                                            }}                                          
                                          /> 
                                        : <PlusIcon 
                                            sx={{ 
                                              fontSize: '2.5rem',
                                              // Place the 'PlusIcon' to the top right corner
                                              top: '-62.5px',
                                              right: '-5px',
                                              position: 'absolute'
                                            }} 
                                          />
                                }
                                aria-controls={ariaControlsAccordionSummaryByElement(student.id)}  // 'panel1bh-content'
                                id={idAccordionSummaryByElement(student.id)} // 'panel1bh-header'
                            > 
                                <ListItem alignItems='center' key={(parseInt(student.id) * 20).toString()}>           
                                    <ListItemAvatar>
                                        <Avatar
                                            variant='circular'
                                            alt={student.city}
                                            src={student.pic}
                                            sx={{
                                                //-- Not needed coz '<Avatar/>' cmp has
                                                //-- "borderRadius: '50%'" (circular) by default 
                                                // borderRadius: '50px'  
                                                height: '100px', 
                                                width: '100px', 
                                                fontFamily: 'RalewayVariableFont',
                                                border: '1px solid lightgrey'                     
                                            }}
                                        />
                                    </ListItemAvatar>
                                    <ThemeProvider theme={theme} key={(parseInt(student.id) * 30).toString()}>
                                        <ListItemText                                      
                                            primary={
                                                strConcatFirstNameLastName(
                                                    student.firstName, student.lastName
                                                )
                                            }
                                            sx={{ marginLeft: '10px' }}
                                            classes={{ 
                                                primary: classes.studentFullName, 
                                                secondary: classes.studentDetails 
                                            }}
                                            secondary={
                                                <React.Fragment>
                                                <Typography
                                                    component='span' // 'div'
                                                    variant='body2'
                                                    className={classes.inline}
                                                    color='textPrimary'
                                                    sx={{ 
                                                        marginLeft: 'auto', 
                                                        fontFamily: 'RalewayVariableFont' 
                                                    }}
                                                > 
                                                        Email: {student.email}  <br />      
                                                        Company: {student.company} <br />
                                                        Skill: {student.skill} <br />
                                                        Average:  {calculateAvgGrades(student.grades)}
                                                </Typography>
                                                </React.Fragment>
                                            }
                                        />
                                    </ThemeProvider>
                                </ListItem>
                            </AccordionSummary>
                            <AccordionDetails 
                                key={(parseInt(student.id) * 40).toString()}  
                                sx={{ width: 'fit-content', paddingLeft: '24%', marginTop: '-10px' }}
                            >
                                {student.grades.map((elTestNote: string, index: number) =>
                                    <> 
                                        <span style={{ float: 'left', fontFamily: 'RalewayVariableFont' }}>
                                            Test {index + 1}: &nbsp;&nbsp;&nbsp;&nbsp; {elTestNote}%
                                        </span> 
                                        <br /> 
                                    </>
                                )}
                            </AccordionDetails>
                        </Accordion>
                        <Stack
                            key={(parseInt(student.id) * 50).toString()} 
                            direction='row' 
                            spacing={2} 
                            sx={{ marginLeft: '23.5%', marginTop: '-10px' }}
                        >                                         
                            {student.studTags.map((stdTag: string, index: number) => 
                                <div key={index}>
                                    <><Item>{stdTag}</Item><br /></>
                                </div> 
                            )}                           
                        </Stack>
                        <div
                            key={(parseInt(student.id) * 60).toString()} 
                            style={{ position: 'initial', marginLeft: '-22%' }}              
                        >
                            <Input
                                // 'id' => To use it in 'document.getElementById' in 'addAppendTagItems()' func
                                id={student.id} 
                                key={student.id} 
                                placeholder='Add a tag' 
                                inputProps={ariaLabelTag}
                                onKeyDown={ev => addAppendTagItems(ev, student.id)}                                             
                            />
                        </div>
                    </>
                    ))}
                </List>
            ) : (
                <CircularProgress color='error' sx={{ marginTop: '50px' }}  />
            )}
        </div>
    );
};

export default AlignItemsList;