import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Header from "./Components/Header";
import Form from "./Components/Form";
import List from "./Components/List";
import { useState } from "react";

function App() {
  const [editVal, setEdit] = useState({
    Qty: "",
    id: "",
    item: "",
    date: "",
    time: "",
    bought: false,
  });

  const onChangeOrEdit = (val) => {
    setEdit(val);
  };

  return (
    <div className="App">
      <Header />
      <div className="container p-5 bg-light border rounded-3">
        <div className="row">
          <Form data={editVal}></Form>
          <List changeEdit={onChangeOrEdit}></List>
        </div>
      </div>
    </div>
  );
}

export default App;
