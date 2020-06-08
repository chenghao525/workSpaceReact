import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ReactDropZone from "../components/AntdDropZone";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
// import "../../../../styles/course/TrackCE.css";

const currentUrl = window.location.href;
const BASE_URL = currentUrl.substring(0, currentUrl.length - 10);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#9AC2FF",
    },
  },
  typography: {
    htmlFontSize: 10,
  },
});

const useStyles = makeStyles({
  textFieldBase: {
    fontSize: "2rem",
    backgroundColor: "#F5F5F5",
    "&:hover": {
      backgroundColor: "rgba(0,0,0,.04)",
    },
    "&$focused": {
      backgroundColor: "#f3f4f6",
    },
  },
  textFieldLabel: {
    fontSize: "1.5rem",
    fontFamily: "inherit",
    transform: "translate(12px, 22px) scale(1)",
    "&$focused": {
      color: "rgba(0,0,0,.6)",
    },
  },
  formButton: {
    height: "36px",
    textTransform: "none",
    fontFamily: "inherit",
    fontSize: "1.6rem",
    padding: 0,
  },
  biggerButton: {
    height: "56px",
    fontSize: "2.5rem",
    marginBottom: "3rem",
  },
  focused: {},
  arrowRightBase: {
    padding: 0,
    minWidth: "unset",
  },
  arrowRightLabel: {
    overflow: "hidden",
  },
  arrowRightIcon: {
    height: "36px",
    width: "24px",
    transform: "scale(2.8)",
  },
  chipsRoot: {
    fontSize: "1.8125rem",
    backgroundColor: "#CCE0FF",
  },
  autocompleteOptions: {
    fontSize: "1.5rem",
    fontFamily: "inherit",
  },
  roundButton: {
    width: "7rem",
    height: "7rem",
    borderRadius: "50%",
  },
});

export default function TrackCE(props) {
  const { cookieCE } = props;

  const classes = useStyles();

  const [values, setValues] = useState({
    courseName: "",
    credit: 0,
    educationProvider: "",
    notes: "",
  });
  const [mandatoryTopics, setMandatoryTopics] = useState([]);
  const [creditType, setCreditType] = useState([]);
  const [fileUploadedList, setFileUploadedList] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    console.log("date: ", date);
    setSelectedDate(date);
  };

  const TextFieldInputLabelProps = {
    classes: {
      root: classes.textFieldLabel,
      focused: classes.focused,
    },
  };

  const TextFieldInputProps = {
    classes: {
      root: classes.textFieldBase,
      focused: classes.focused,
    },
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleSelectChange = (selectedValue) => {
    console.log("selected value: ", selectedValue);
    if (selectedValue.type === "creditType") {
      setCreditType(selectedValue.values);
    } else if (selectedValue.type === "mandatoryTopics") {
      setMandatoryTopics(selectedValue.values);
    }
  };

  const handleCancel = (e) => {
    window.location.replace(BASE_URL + "CEList");
  };

  const createNewCECourse = () =>{
    let params = {
      CourseName: values.courseName,
      CreditHours: parseFloat(values.credit),
      // creditType: creditType,
      // mandatoryTopics: mandatoryTopics,
      educator: values.educationProvider,
      Notes: values.notes,
      cedate: selectedDate,
    };

    return new Promise(((resolve,reject)=>axios({
      method: "post",
      url: "../AddCe/createNewTrackCE",
      data: params,
      // headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response)=>{
        console.log("BAse", BASE_URL);
        if (response.data.code === 200) {
          console.log("CE created successfully");
          let singleviewCEid = response.data.singleviewCEid;
          let userId = response.data.userId;
          let formData = new FormData();

          formData.append("singleviewCEid", singleviewCEid);
          formData.append("userID", userId);
          resolve(formData);
          
          // window.location.replace(BASE_URL + "CEList");
        }
      })
      .catch(function (response) {
        //handle error
        console.log(response);
        reject(response);
      })))
  }

  const uploadFileToExistCE = (formData) => {
    return new Promise((resolve,reject)=>axios({
      method: "post",
      url: "../MyCEFileupload",
      data: formData,
    })
      .then((res) => {
        console.log("File uploaded successfully",res);
        resolve("Uploaded");
      })
      .catch((err) => {
        console.log(err);
        reject(err);
      }))
    //
  };

  const handleTrackBtn = async(e) => {

    const formData = await createNewCECourse();
    
    fileUploadedList.map(async file=>{
        console.log("File to be uploading!!!",file);
        formData.set("certificate-upload", file);
        await uploadFileToExistCE(formData);
    })
  };

  const handleUpload = async(file, fileList) => {

    if (values.courseName === "") {
      let fileName = file.name;
      fileName = fileName.split(".");
      setValues({ ...values, courseName: fileName[0] });
    }
    console.log("fileList", fileList);
    
    try {
      const fileContents = await readUploadedFileAsText(file);
      setFileUploadedList([...fileUploadedList,file]);
    } catch (e) {
      console.warn(e.message);
    }
  };

  const setFile = (event) => {
    if (values.courseName === "") {
      let fileName = event.target.files[0].name;
      fileName = fileName.split(".");
      setValues({ ...values, courseName: fileName[0] });
    }
    console.log("data1, ", event.target);
    console.log("file1, type: ", typeof event.target.files[0], event.target.files[0]);
    setFileUploadedList([...fileUploadedList,event.target.files[0]]);
  };

  const readUploadedFileAsText = (inputFile) => {
    const temporaryFileReader = new FileReader();

    return new Promise((resolve, reject) => {
      temporaryFileReader.onerror = () => {
        temporaryFileReader.abort();
        reject(new DOMException("Problem parsing input file."));
      };

      temporaryFileReader.onload = () => {
        resolve(temporaryFileReader.result);
      };
      temporaryFileReader.readAsDataURL(inputFile);
    });
  };

  const handleRemove = (fileName) =>{
    
    const newFileList = fileUploadedList.filter(file=>file.name !== fileName);
    setFileUploadedList(newFileList);
}

useEffect(() => {
  console.log("fileUploadedList: ", fileUploadedList);
}, [fileUploadedList]);

  return (
    <ThemeProvider theme={theme}>
      <div class="visible-card-container">
        <div id="cards-container">
          <form id="tracking-form" action="javascript:void(0);">
            <div id="track-card-container">
              <div class="mdc-layout-grid my-layout-grid">
                <div class="mdc-layout-grid__inner my-layout-row">
                  <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-9-desktop mdc-layout-grid__cell--span-6-tablet">
                    <div class="mdc-card my-card" id="track-card">
                      <div class="track-card-header">
                        <h1>Track {cookieCE}</h1>
                        <h4>
                          Put in the basic {cookieCE} info, add more details,
                          and/or upload your certificate.
                        </h4>
                      </div>
                      <div class="track-card-form">
                        <div class="mdc-layout-grid__inner track-card-form-row">
                          <div class="mdc-layout-grid__cell form-cell mdc-layout-grid__cell--span-12-desktop mdc-layout-grid__cell--span-8-tablet">
                            <TextField
                              id="course-name-text-field"
                              fullWidth
                              label="Course Name"
                              variant="filled"
                              value={values.courseName}
                              name="courseName"
                              InputLabelProps={TextFieldInputLabelProps}
                              InputProps={TextFieldInputProps}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div class="mdc-layout-grid__inner track-card-form-row">
                          <div class="mdc-layout-grid__cell form-cell responsive-mr-2 mdc-layout-grid__cell--span-6-desktop mdc-layout-grid__cell--span-4-tablet">
                            <TextField
                              id="credits-text-field"
                              fullWidth
                              label="Credits"
                              variant="filled"
                              name="credit"
                              InputLabelProps={TextFieldInputLabelProps}
                              InputProps={TextFieldInputProps}
                              onChange={handleChange}
                            />
                          </div>
                          <div class="mdc-layout-grid__cell form-cell mdc-layout-grid__cell--span-6-desktop mdc-layout-grid__cell--span-4-tablet">
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                              <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                label="Date"
                                inputVariant="filled"
                                value={selectedDate}
                                onChange={handleDateChange}
                                fullWidth
                                InputLabelProps={TextFieldInputLabelProps}
                                InputProps={TextFieldInputProps}
                              />
                            </MuiPickersUtilsProvider>
                          </div>
                        </div>
                        <div class="mdc-layout-grid__inner track-card-form-row">
                          <div class="mdc-layout-grid__cell form-cell mdc-layout-grid__cell--span-12-desktop mdc-layout-grid__cell--span-8-tablet">
                            <Button
                              id="more-details-button"
                              variant="contained"
                              className={classes.formButton}
                            >
                              Add More Details
                            </Button>
                            <Button
                              id="more-details-arrow-button"
                              variant="text"
                              classes={{
                                root: classes.arrowRightBase,
                                label: classes.arrowRightLabel,
                              }}
                            >
                              <ArrowRightIcon
                                className={classes.arrowRightIcon}
                              />
                            </Button>
                          </div>
                        </div>
                        <div class="mobile-upload-container">
                          <div class="mdc-layout-grid__inner track-card-form-row">
                            <div class="mdc-layout-grid__cell form-cell mdc-layout-grid__cell--span-8-tablet">
                              <input
                                id="mobile-upload-box"
                                class="hidden"
                                type="file"
                                name="files"
                              />
                            </div>
                          </div>
                        </div>
                        <div class="mdc-layout-grid__inner track-card-form-row">
                          <div
                            id="cancel-button-cell"
                            class="mdc-layout-grid__cell form-cell responsive-mr-2 mdc-layout-grid__cell--span-4-desktop mdc-layout-grid__cell--span-3-tablet"
                          >
                            <Button
                              id="cancel-button"
                              variant="contained"
                              fullWidth
                              className={`${classes.formButton} ${classes.biggerButton}`}
                              onClick={handleCancel}
                            >
                              Cancel
                            </Button>
                          </div>
                          <div class="mdc-layout-grid__cell form-cell mdc-layout-grid__cell--span-8-desktop mdc-layout-grid__cell--span-5-tablet">
                            <Button
                              id="track-now-button"
                              variant="contained"
                              fullWidth
                              className={`${classes.formButton} ${classes.biggerButton}`}
                              onClick={handleTrackBtn}
                            >
                              Track now!
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3-desktop mdc-layout-grid__cell--span-2-tablet">
                    <div class="mdc-card my-card" id="upload-card">
                      <div class="upload-card-header">
                        <h2>Upload Certificates</h2>
                        <h5>Look how easy it is!</h5>
                      </div>
                      <div class="drag-and-drop-box">
                        <input
                          id="certificate-upload"
                          accept=".pdf, image/*"
                          type="file"
                          // name="files"
                          title="Upload"
                          onChange={setFile}
                        />
                        <ReactDropZone onChange={handleUpload} onRemove={handleRemove}></ReactDropZone>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div id="more-details-container">
              <div class="mdc-layout-grid my-layout-grid">
                <div class="mdc-layout-grid__inner my-layout-row">
                  <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-3-desktop mdc-layout-grid__cell--span-2-tablet">
                    <a
                      href="javascript:void(0);"
                      id="back-to-basic-info-container"
                      tabindex="-1"
                    >
                      <div
                        id="back-to-basic-info-card"
                        class="mdc-card my-card mdc-ripple-surface"
                      >
                        <div class="back-to-basic-info-content">
                          <h2>Back to Basic Info:</h2>
                          <Button
                            id="back-to-basic-info-button"
                            variant="text"
                            classes={{ root: classes.roundButton }}
                            type="button"
                          >
                            <ArrowLeftIcon style={{ fontSize: "48px" }} />
                          </Button>
                        </div>
                        <div class="mobile-back-to-basic-info">
                          <ArrowBackIosIcon style={{ fontSize: "36px" }} />
                          <span class="mobile-back-text">Basic Info</span>
                        </div>
                      </div>
                    </a>
                  </div>
                  <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-9-desktop mdc-layout-grid__cell--span-6-tablet">
                    <div class="mdc-card my-card" id="more-details-card">
                      <div class="more-details-header">
                        <h1>Add More Details</h1>
                      </div>
                      <div class="more-details-card-form">
                        <div class="mdc-layout-grid__inner more-details-form-row">
                          <div class="mdc-layout-grid__cell form-cell mdc-layout-grid__cell--span-12-desktop mdc-layout-grid__cell--span-8-tablet">
                            
                          </div>
                        </div>
                        <div class="mdc-layout-grid__inner more-details-form-row">
                          <div class="mdc-layout-grid__cell form-cell mdc-layout-grid__cell--span-12-desktop mdc-layout-grid__cell--span-8-tablet">
                          
                          </div>
                        </div>
                        <div class="mdc-layout-grid__inner more-details-form-row">
                          <div class="mdc-layout-grid__cell form-cell mdc-layout-grid__cell--span-12-desktop mdc-layout-grid__cell--span-8-tablet">
                            <TextField
                              id="education-provider-text-field"
                              fullWidth
                              label="Education Provider"
                              variant="filled"
                              name="educationProvider"
                              InputLabelProps={TextFieldInputLabelProps}
                              InputProps={TextFieldInputProps}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div class="mdc-layout-grid__inner more-details-form-row">
                          <div class="mdc-layout-grid__cell form-cell mdc-layout-grid__cell--span-12-desktop mdc-layout-grid__cell--span-8-tablet">
                            <TextField
                              id="notes-text-area"
                              fullWidth
                              label="Notes"
                              variant="filled"
                              multiline
                              rows="4"
                              name="notes"
                              InputLabelProps={TextFieldInputLabelProps}
                              InputProps={TextFieldInputProps}
                              onChange={handleChange}
                            />
                          </div>
                        </div>
                        <div class="mdc-layout-grid__inner more-details-form-row done-with-details-row">
                          <div class="mdc-layout-grid__cell form-cell mdc-layout-grid__cell--span-3-desktop mdc-layout-grid__cell--span-2-tablet"></div>
                          <div class="mdc-layout-grid__cell mdc-layout-grid__cell--span-6-desktop mdc-layout-grid__cell--span-4-tablet">
                            <Button
                              id="done-with-details-button"
                              variant="contained"
                              type="submit"
                              fullWidth
                              className={`${classes.formButton} ${classes.biggerButton}`}
                              onClick={handleTrackBtn}
                            >
                              Track now!
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </ThemeProvider>
  );
}
const top100Films = [
  { title: "The Shawshank Redemption", year: 1994 },
  { title: "The Godfather", year: 1972 },
  { title: "The Godfather: Part II", year: 1974 },
  { title: "The Dark Knight", year: 2008 },
  { title: "12 Angry Men", year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: "Pulp Fiction", year: 1994 },
  { title: "The Lord of the Rings: The Return of the King", year: 2003 },
  { title: "The Good, the Bad and the Ugly", year: 1966 },
  { title: "Fight Club", year: 1999 },
  { title: "The Lord of the Rings: The Fellowship of the Ring", year: 2001 },
  { title: "Star Wars: Episode V - The Empire Strikes Back", year: 1980 },
  { title: "Forrest Gump", year: 1994 },
  { title: "Inception", year: 2010 },
  { title: "The Lord of the Rings: The Two Towers", year: 2002 },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: "Goodfellas", year: 1990 },
  { title: "The Matrix", year: 1999 },
  { title: "Seven Samurai", year: 1954 },
  { title: "Star Wars: Episode IV - A New Hope", year: 1977 },
  { title: "City of God", year: 2002 },
  { title: "Se7en", year: 1995 },
  { title: "The Silence of the Lambs", year: 1991 },
  { title: "It's a Wonderful Life", year: 1946 },
  { title: "Life Is Beautiful", year: 1997 },
  { title: "The Usual Suspects", year: 1995 },
  { title: "Léon: The Professional", year: 1994 },
  { title: "Spirited Away", year: 2001 },
  { title: "Saving Private Ryan", year: 1998 },
  { title: "Once Upon a Time in the West", year: 1968 },
  { title: "American History X", year: 1998 },
  { title: "Interstellar", year: 2014 },
  { title: "Casablanca", year: 1942 },
  { title: "City Lights", year: 1931 },
  { title: "Psycho", year: 1960 },
  { title: "The Green Mile", year: 1999 },
  { title: "The Intouchables", year: 2011 },
  { title: "Modern Times", year: 1936 },
  { title: "Raiders of the Lost Ark", year: 1981 },
  { title: "Rear Window", year: 1954 },
  { title: "The Pianist", year: 2002 },
  { title: "The Departed", year: 2006 },
  { title: "Terminator 2: Judgment Day", year: 1991 },
  { title: "Back to the Future", year: 1985 },
  { title: "Whiplash", year: 2014 },
  { title: "Gladiator", year: 2000 },
  { title: "Memento", year: 2000 },
  { title: "The Prestige", year: 2006 },
  { title: "The Lion King", year: 1994 },
  { title: "Apocalypse Now", year: 1979 },
  { title: "Alien", year: 1979 },
  { title: "Sunset Boulevard", year: 1950 },
  {
    title:
      "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
    year: 1964,
  },
  { title: "The Great Dictator", year: 1940 },
  { title: "Cinema Paradiso", year: 1988 },
  { title: "The Lives of Others", year: 2006 },
  { title: "Grave of the Fireflies", year: 1988 },
  { title: "Paths of Glory", year: 1957 },
  { title: "Django Unchained", year: 2012 },
  { title: "The Shining", year: 1980 },
  { title: "WALL·E", year: 2008 },
  { title: "American Beauty", year: 1999 },
  { title: "The Dark Knight Rises", year: 2012 },
  { title: "Princess Mononoke", year: 1997 },
  { title: "Aliens", year: 1986 },
  { title: "Oldboy", year: 2003 },
  { title: "Once Upon a Time in America", year: 1984 },
  { title: "Witness for the Prosecution", year: 1957 },
  { title: "Das Boot", year: 1981 },
  { title: "Citizen Kane", year: 1941 },
  { title: "North by Northwest", year: 1959 },
  { title: "Vertigo", year: 1958 },
  { title: "Star Wars: Episode VI - Return of the Jedi", year: 1983 },
  { title: "Reservoir Dogs", year: 1992 },
  { title: "Braveheart", year: 1995 },
  { title: "M", year: 1931 },
  { title: "Requiem for a Dream", year: 2000 },
  { title: "Amélie", year: 2001 },
  { title: "A Clockwork Orange", year: 1971 },
  { title: "Like Stars on Earth", year: 2007 },
  { title: "Taxi Driver", year: 1976 },
  { title: "Lawrence of Arabia", year: 1962 },
  { title: "Double Indemnity", year: 1944 },
  { title: "Eternal Sunshine of the Spotless Mind", year: 2004 },
  { title: "Amadeus", year: 1984 },
  { title: "To Kill a Mockingbird", year: 1962 },
  { title: "Toy Story 3", year: 2010 },
  { title: "Logan", year: 2017 },
  { title: "Full Metal Jacket", year: 1987 },
  { title: "Dangal", year: 2016 },
  { title: "The Sting", year: 1973 },
  { title: "2001: A Space Odyssey", year: 1968 },
  { title: "Singin' in the Rain", year: 1952 },
  { title: "Toy Story", year: 1995 },
  { title: "Bicycle Thieves", year: 1948 },
  { title: "The Kid", year: 1921 },
  { title: "Inglourious Basterds", year: 2009 },
  { title: "Snatch", year: 2000 },
  { title: "3 Idiots", year: 2009 },
  { title: "Monty Python and the Holy Grail", year: 1975 },
];
//ReactDOM.render(<TrackCE />, document.getElementById("react"));

// window.RenderApp = function (cookieCE) {
//   new ReactDOM.render(
//     <TrackCE cookieCE={cookieCE} />,
//     this.document.getElementById("react")
//   );
// };
