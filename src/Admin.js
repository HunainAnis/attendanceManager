import React from 'react'
import * as firebase from 'firebase'
import { CSVLink } from "react-csv";
import { MDBContainer, MDBBtn, MDBRow, MDBCol, MDBTable, MDBTableHead, MDBTableBody, MDBInput } from 'mdbreact'
import { MDBTabPane, MDBTabContent, MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";



class Admin extends React.Component {
    
    state = {
        activeItem: "1",
        todayclass:[],
        marketing:false,
        forensic:false,
        medchem:false,
        pharmatech:false,
        clinical:false,
        biopharma:false,
        days:null,
        password:''
    }

    toggle = tab => e => {
        if (this.state.activeItem !== tab) {
          this.setState({
            activeItem: tab
          });
        }
      };
    

    // componentDidMount() {
    //     const db = firebase.database().ref().child('days')
    //     db.on('value', data=>{
    //         this.setState({days:data.val()})
    //     })
    // }

    submitClasses() {
        const NewArray = Object.keys(this.state).filter(i=>this.state[i]===true)
        console.log(NewArray)
        const db = firebase.database().ref().child('classes')
        db.set(NewArray)
        .then(console.log('new classes'))
    }
    handleChange(e) {
        const { name } = e.target
        this.setState(state=>({
            [name]:!state[name]
        }))
    }
    handlePassword(e) {
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    removeEntry(ref,id) {
        const db = firebase.database().ref().child('days').child(ref).child('students').child(id)
        db.remove()
        .then(
            console.log(ref,id)
        )
    }

    arrangeData(data) {
        const { days } = this.props
        let arranged = {}
        // console.log(days)
        Object.keys(days).map(date=>{
            return Object.keys(days[date].students).map(student=>{
               arranged = {
                    'name': days[date].students[student].name.toString(),
                    'rollno': days[date].students[student].enrollment.toString(),
                    'classes':  days[date].students[student].classes!== undefined ? days[date].students[student].classes.toString(): 'not provided',
                    'date':  new Date(days[date].students[student].time).toLocaleDateString(),
                    'remove': <MDBBtn onClick={()=>this.removeEntry(date,student)}>X</MDBBtn>
                }
                return data.rows.push(arranged)
            }
            )
            // console.log(arranged)
        })
    }
    
    render() {
        // console.log(this.state.days)
        const data = {
            columns: [
            {
                label: 'Name',
                field: 'name',
                key: 'name',
                sort: 'dsc'
            },
            {
                label: 'Roll #',
                field: 'rollno',
                key: 'rollno',
                sort: 'dsc'
            },
            {
                label: 'Class(es)',
                field: 'classes',
                key: 'classes',
                sort: 'dsc'
            },
            {
                label: 'Date',
                field: 'date',
                key: 'date',
                sort: 'dsc'
            },
            {
                label: 'Remove',
                field: 'remove',
                key: 'remove',
                sort: 'dsc'
            }
        ],
        rows: []
    }
    if(this.state.password !== 'myNewPassword') {
        return(
            <MDBContainer>
                <MDBInput name='password' onChange={(e)=>this.handlePassword(e)} value={this.state.password} label="Enter the Admin Password" group type="password" validate error="wrong"
                success="right" />
            </MDBContainer>
            )
    }
    this.props.days !== null && this.arrangeData(data)
        return(
            <MDBContainer>
                <div style={{textAlign:'center'}}>
                    <h2>Today's classes</h2>
                    <ol>
                        {this.props.classes === null
                        ?<h3>No classes available for today</h3>
                        :this.props.classes.map(i=>(
                            <li key={i}>{i}</li>
                        ))
                    }
                    </ol>
                </div>
                <MDBNav className="nav-tabs mt-5">
                    <MDBNavItem>
                        <MDBNavLink link to="#" active={this.state.activeItem === "1"} onClick={this.toggle("1")} role="tab" >
                        Update Classes
                        </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                        <MDBNavLink link to="#" active={this.state.activeItem === "2"} onClick={this.toggle("2")} role="tab" >
                        View all Attendance
                        </MDBNavLink>
                    </MDBNavItem>
                </MDBNav>
                <MDBTabContent activeItem={this.state.activeItem} >
                    <MDBTabPane tabId="1" role="tabpanel">
                        <div>
                            <h2>Fill todays class checkbox!</h2>
                        </div>
                        <div className="custom-control custom-checkbox">
                        <input onChange={(e)=>this.handleChange(e)} type="checkbox" className="custom-control-input" id="medchem" name='medchem' checked={this.state.medchem} />
                        <label className="custom-control-label" htmlFor="medchem">Medicinal Chemistry</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                        <input onChange={(e)=>this.handleChange(e)} type="checkbox" className="custom-control-input" id="marketing" name='marketing' checked={this.state.marketing} />
                        <label className="custom-control-label" htmlFor="marketing">Pharmaceutical Marketing</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                        <input onChange={(e)=>this.handleChange(e)} type="checkbox" className="custom-control-input" id="forensic" name='forensic' checked={this.state.forensic} />
                        <label className="custom-control-label" htmlFor="forensic">Forensic Pharmacy</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                        <input onChange={(e)=>this.handleChange(e)} type="checkbox" className="custom-control-input" id="pharmatech" name='pharmatech' checked={this.state.pharmatech} />
                        <label className="custom-control-label" htmlFor="pharmatech">Pharmaceutical Technology</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                        <input onChange={(e)=>this.handleChange(e)} type="checkbox" className="custom-control-input" id="biopharma" name='biopharma' checked={this.state.biopharma} />
                        <label className="custom-control-label" htmlFor="biopharma">Biopharmaceutics and Pharmacokinetics</label>
                        </div>
                        <div className="custom-control custom-checkbox">
                        <input onChange={(e)=>this.handleChange(e)} type="checkbox" className="custom-control-input" id="clinical" name='clinical' checked={this.state.clinical} />
                        <label className="custom-control-label" htmlFor="clinical">Clinical Pharmacy</label>
                        </div>
                        <MDBBtn onClick={()=>this.submitClasses()}>Submit</MDBBtn>
                    </MDBTabPane>
                    <MDBTabPane tabId="2" role="tabpanel">
                        <MDBRow>
                            <MDBCol>
                            <MDBBtn>
                                <CSVLink data={data.rows} headers={data.columns}>
                                    Download Excel File
                                </CSVLink>
                            </MDBBtn>
                                <MDBTable responsive>
                                    <MDBTableHead columns={data.columns} />
                                    <MDBTableBody rows={data.rows} />
                                </MDBTable>
                            </MDBCol>
                        </MDBRow>
                    </MDBTabPane>
                </MDBTabContent>
        </MDBContainer>
        )
    }
}

export default Admin