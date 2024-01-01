import { useEffect, useState } from "react"
import { toast } from 'react-toastify';

const Todo = () => {

    const [data, setData] = useState<any[]>([])
    const [naming, setNaming] = useState<string>("")
    const [classing, setClassing] = useState<string>("")
    const [rolling, setRolling] = useState<string>("")
    const [semester, setSemester] = useState<string>("")
    const [indexing, setIndexing] = useState<string>("")
    const [flag,setFlag]=useState(false)
    console.log(data)
    useEffect(()=>{
        getData()

    },[])
    const getData = () =>{
        const storedData:any = JSON.parse(localStorage.getItem('Todo'));
        setData(storedData || [])
    }

    const alpha = (e: any) => {
        setNaming(e.target.value)
    }
    const beta = (e: any) => {
        setClassing(e.target.value)
    }
    const gema = (e: any) => {
        setRolling(e.target.value)
    }
    const peta = (e: any) => {
        setSemester(e.target.value)
    }
    const onSubmitHandler = () => {
        if (naming && classing && rolling && semester !== "") {
            let a = {
                name: naming,
                class: classing,
                roll_no: rolling,
                semester: semester
            }
            toast.success('Student has been added', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
           
        let kuch  = ([...data, a])
        setData(kuch)
            localStorage.setItem('Todo', JSON.stringify(kuch));
            setRolling("")
            setClassing("")
            setNaming("")
            setSemester("")

            // data.push(a)
            console.log(data);

        }
        else {
            toast.success('All the fields are required', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });

        }


    }


    const onDeleteHandler = (indexing: any) => {

        let a = data.filter((value, index) => {
            if (indexing !== index) {
                return value

            }

        })
        setData([...a])

    }

    const onEditHandler = (valueing: any, indexing: string) => {
        setFlag(true)
        setIndexing(indexing)
       setNaming(valueing.name)
       setClassing(valueing.class)
       setRolling(valueing.roll_no)
       setSemester(valueing.semester)

    }
    const onUpdateHandler = () =>{
        if(naming && classing && rolling && semester !=""){
            let a = {
                name:naming,
                class:classing,
                roll_no:rolling,
                semester:semester
            }
            let b = data.map((value,index:any)=>{
                if(indexing === index ){
                    return a 


                }
                else{
                    return value
                }

            })
            setFlag(false)
            setData([...b])
            setNaming("")
            setClassing("")
            setRolling("")
            setSemester("")


        }
        else{
            alert("All fields are required")
        }
    }

    return (
        <div>
            <div className="d-flex justify-content-center pt-5">
                <div className="card" style={{ width: "30rem" }}>
                    <div className="card-header">
                        <h3 style={{ textAlign: "center" }}>
                            Application Form
                        </h3>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <br />
                            <input type="text" className="form-control" value={naming} aria-describedby="emailHelp" placeholder="Enter Name" onChange={alpha} />
                            <br />
                            <select className="form-control" aria-describedby="emailHelp" value={classing} onChange={beta}>
                                <option value="">Class</option>
                                <option value="class1">BSCS Morning</option>
                                <option value="class2">BSCS Replica</option>
                            </select>
                            <br />
                            <input type="number" className="form-control" value={rolling} aria-describedby="emailHelp" placeholder="Roll No" onChange={gema} />
                            <br />
                            <select className="form-control" aria-describedby="emailHelp" value={semester} onChange={peta}>
                                <option value="">Semester</option>
                                <option value="semester1">Semester 1</option>
                                <option value="semester2">Semester 2</option>
                                <option value="semester3">Semester 3</option>
                                <option value="semester4">Semester 4</option>
                                <option value="semester5">Semester 5</option>
                                <option value="semester6">Semester 6</option>
                                <option value="semester7">Semester 7</option>
                                <option value="semester8">Semester 8</option>
                            </select>

                            <div className="text-center pt-3">
                                {
                                    flag ? <button className="btn btn-success" onClick={onUpdateHandler}>Update</button>:
                                
                                <button className="btn btn-primary" onClick={onSubmitHandler}>Submit</button>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <table className="table mt-5">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Class</th>
                        <th scope="col">Roll No</th>
                        <th scope="col">Semester</th>
                        <th scope="col">Delete</th>
                        <th scope="col">Update</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data?.map((value:any, index:any) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index}</th>
                                    <td>{value?.name}</td>
                                    <td>{value?.class}</td>
                                    <td>{value?.roll_no}</td>
                                    <td>{value?.semester}</td>
                                    <td><button type="button" className="btn btn-primary" onClick={() => onDeleteHandler(index)}>Delete</button></td>
                                    <td><button type="button" className="btn btn-success" onClick={() => onEditHandler(value, index)}>Update</button></td>
                                </tr>

                            )
                        })
                    }





                </tbody>
            </table>
        </div>
    )
}
export default Todo;


