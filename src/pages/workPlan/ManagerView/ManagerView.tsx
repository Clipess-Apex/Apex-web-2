import WorkPlanCard from "../../../components/workPlan/Shared/WorkPlanCard";
import { ReactComponent as Clients } from "../../../icons/workPlan/Clients.svg";
import { ReactComponent as AddProjects } from "../../../icons/workPlan/ToDo.svg";
import { ReactComponent as AddTasks } from "../../../icons/workPlan/addTask.svg";
import { ReactComponent as Teams } from "../../../icons/workPlan/Teams.svg";
import { ReactComponent as Calendar } from "../../../icons/workPlan/Calendar.svg";
import { ReactComponent as ToDoList } from "../../../icons/workPlan/AddProjects.svg";
import { ReactComponent as Worksheet } from "../../../icons/workPlan/TaskList.svg";
import { ReactComponent as Projects } from "../../../icons/workPlan/ManagerProjects.svg";
import "../../../styles/workPlan/ManagerView.css";
import { Link } from "react-router-dom";
import { getEmployeeTasks } from "../../../services/workPlan/TaskServices";
import { useEffect, useState } from "react";
import { ProjectTask } from "../../../models/workPlan/ProjectTask";
import WidgetCard from "../../../components/workPlan/Shared/WidgetCard";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../../../providers/AuthContextProvider";

interface StoredUser {
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  EmployeeID: number;
  ImageUrl: string;
  FirstName: string;
  LastName: string;
}

const ManagerView = () => {

  const [tasks, setTasks] = useState<ProjectTask[]>([]);
  const [items, setItems] = useState<ProjectTask[]>([]);
  const [EmployeeTaskData, setEmployeeTaskData] = useState<ProjectTask[]>([]);
  const [EmployeeToDoData, setEmployeeToDoData] = useState<ProjectTask[]>([]);
  const [EmployeeDoneData, setEmployeeDOneData] = useState<ProjectTask[]>([]);
  const [EmployeeProjects, setEmployeeProjects] = useState<number[]>([]);
  const [EmployeeId, setEmployeeId] = useState<number | undefined>(); // ID, Should use from Token
  
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
  
    if (storedUser) {
      const parsedUser: StoredUser = JSON.parse(storedUser); // Parse storedUser as StoredUser type
      setEmployeeId(parsedUser.EmployeeID)
      console.log("Employee id in daily time netry is",EmployeeId)
      console.log("Header Parsed user is",parsedUser.EmployeeID)
    }
  },[])

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getEmployeeTasks();
        data.forEach((element: any) => {
          element["delete"] = "true";
        });
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchData();

    return () => {
      setTasks([]);
    };
  }, []);

  useEffect(()=>{
    tasks.forEach((element: any) => {
      if (element["assigned"] == true) {
        if(!(items.includes(element))){
          items.push(element);
        }
      }
    });
  
    items.forEach((element: any) => {
      const userArray = element["selectedUsers"]
        .split(",")
        .map((user: any) => user.trim());
  
      for (let index = 0; index < userArray.length; index++) {
        if (userArray[index] == EmployeeId) {
          if (!(EmployeeTaskData.includes(element))) {
            EmployeeTaskData.push(element);
          }
        }
      }
    });
  
    EmployeeTaskData.forEach((data: any) => {
      if (data["taskStatusId"] == 1) {
        if (!(EmployeeToDoData.includes(data))) {
          EmployeeToDoData.push(data);
        }
      }
    });
  
    EmployeeTaskData.forEach((data: any) => {
      if (data["taskStatusId"] == 3) {
        if (!(EmployeeDoneData.includes(data))) {
          EmployeeDoneData.push(data);
        }
      }
    });
  
    EmployeeTaskData.forEach((data: any) => {
      if (!(EmployeeProjects.includes(data["projectId"]))) {
        EmployeeProjects.push(data["projectId"]);
      }
    });
  })

  const cardData = [
    {
      id: 1,
      title: "Company Projects",
      content: "",
      icon: <AddProjects />,
      path: "/workplan/manager/managerProjects",
    },
    {
      id: 2,
      title: "Company Clients",
      content: "",
      icon: <Clients />,
      path: "/workplan/manager/managerClients",
    },
    {
      id: 3,
      title: "Company Teams",
      content: "",
      icon: <Teams />,
      path: "/workplan/manager/managerTeams",
    },
    {
      id: 4,
      title: "Company Tasks",
      content: "",
      icon: <AddTasks />,
      path: "/workplan/manager/managerTasks",
    },
    {
      id: 5,
      title: "Your Projects",
      content: "",
      icon: <Projects />,
      path: "/workplan/employee/employeeProjects",
    },
    {
      id: 6,
      title: "Your To-Do List",
      content: "",
      icon: <ToDoList />,
      path: "/workplan/employee/employeeToDo",
    },
    {
      id: 7,
      title: "Your Worksheet",
      content: "",
      icon: <Worksheet />,
      path: "/workplan/employee/employeeTasks",
    },
    {
      id: 8,
      title: "Your Work Calendar",
      content: "",
      icon: <Calendar />,
      path: "/workplan/employee/employeeWorkCalendar",
    },
  ];

  return (
    <div className="card-container">
      <div className="grid">
          <WidgetCard
            title="Projects Engaged"
            value={`${EmployeeProjects.length}`}
          />
          <WidgetCard title="Tasks Done" value={`${EmployeeDoneData.length}`} />
          <WidgetCard
            title="Tasks To Do"
            value={`${EmployeeToDoData.length}`}
          />
        </div>
      <div className="grid">
        {cardData.map((card) => (
          <Link to={card.path} key={card.id} style={{ textDecoration: "none" }}>
            <WorkPlanCard
              key={card.id}
              title={card.title}
              content={card.content}
              icon={card.icon}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ManagerView;
