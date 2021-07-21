import { useState, useEffect } from "react";
import db from "../firebase/firebaseConfig";

const List = (props) => {
  const [groceries, setGroceries] = useState([]);

  useEffect(() => {
    db.collection("groceryList").onSnapshot((querySnapshot) => {
      var valu = [];
      querySnapshot.forEach((doc) => {
        const x = {
          ...doc.data(),
          id: doc.id,
        };
        //console.log(x);
        valu.push(x);
      });
      setGroceries(valu);
    });
  }, []);

  const handleItemDelete = (id) => {
    db.collection("groceryList")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const handleItemEdit = (a) => {
    //console.log(a);
    props.changeEdit(a);
  };

  const handleBought = (a) => {
    console.log(a);
    db.collection("groceryList")
      .doc(a.id)
      .set({
        ...a,
        bought: !a.bought,
      })
      .then(() => {
        console.log(a);
      });
  };

  return (
    <div
      className="
            col-md-7 col-sm-12
            offset-md-1
            my-0
            p-5
            bg-light
            border
            rounded-3
            overflow-auto
            list
          "
    >
      <h4 className="text-center text-primary">List of Items</h4>

      <table className="table">
        <thead className="bg-primary text-white">
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Qty</th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {groceries &&
            groceries.map((eachItem) => (
              <tr>
                <td>{eachItem.item}</td>
                <td>{eachItem.Qty}</td>
                <td>{eachItem.date}</td>
                <td>{eachItem.time}</td>
                <td>
                  <i
                    className="bi bi-pencil-square mx-2 text-primary"
                    onClick={function (e) {
                      handleItemEdit(eachItem); //can pass arguments this.btnTapped(foo, bar);
                    }}
                  ></i>{" "}
                  <i
                    className="bi bi-trash mx-2 text-danger"
                    onClick={function (e) {
                      handleItemDelete(eachItem.id); //can pass arguments this.btnTapped(foo, bar);
                    }}
                  ></i>{" "}
                  {eachItem.bought && (
                    <i
                      className="bi bi-bag-check-fill text-success"
                      onClick={function (e) {
                        handleBought(eachItem); //can pass arguments this.btnTapped(foo, bar);
                      }}
                    ></i>
                  )}{" "}
                  {!eachItem.bought && (
                    <i
                      className="bi bi-bag-x-fill text-primary"
                      onClick={function (e) {
                        handleBought(eachItem); //can pass arguments this.btnTapped(foo, bar);
                      }}
                    ></i>
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default List;
