import { useState, useEffect } from "react";
import db from "../firebase/firebaseConfig";

const Form = (props) => {
  const [values, setValues] = useState("");

  useEffect(() => {
    const p = {
      item: props.data.item,
      Qty: props.data.Qty,
      id: props.data.id,
      bought: props.data.bought,
      date: props.data.date,
      time: props.data.time,
    };
    setValues(p);
  }, [props]);

  const handleInput = (e) => {
    var { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    //console.log(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const date = new Date();
    const x = {
      ...values,
      bought: false,
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    };

    if (x.id === "") {
      db.collection("groceryList")
        .add(x)
        .then(() => {
          setValues({
            item: "",
            Qty: "",
            id: "",
            date: "",
            time: "",
            bought: false,
          });
        })
        .catch(function (error) {
          console.error("Error adding document: ", error);
        });
    } else {
      db.collection("groceryList")
        .doc(x.id)
        .set(x)
        .then(() => {
          setValues({
            item: "",
            Qty: "",
            id: "",
            date: "",
            time: "",
            bought: false,
          });
        });
    }
  };

  return (
    <div className="col-md-4 col-sm-12 container p-5 bg-light border rounded-3">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Item Name
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={values.item}
            name="item"
            onChange={handleInput}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <input
            className="form-control"
            value={values.Qty}
            onChange={handleInput}
            name="Qty"
          />
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
