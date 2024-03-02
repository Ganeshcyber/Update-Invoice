import React, { useState , useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  addItem,
  deleteItem,
  updateTotalAmount,
  setCustomerDetails,
  // resetItems
} from "./redux/action";

const App = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, sNoCounter, customerDetails } = useSelector(
    (state) => state,
  );

  // const [invoiceNumber, setInvoiceNumber] = useState(1);

  const [customerName, setCustomerName] = useState("");
  // const [invoiceNo, setInvoiceNo] = useState("#1");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [address, setAddress] = useState("");



  const generateInvoiceNumber = () => {
    const timestamp = new Date().getTime();
    return `#${timestamp}`;
  };

  const [invoiceNo, setInvoiceNo] = useState(generateInvoiceNumber());

  useEffect(() => {  
    setInvoiceNo(generateInvoiceNumber());
  }, []);




  const handleNewButtonClick = () => {
    dispatch(
      addItem({
        sNo: sNoCounter,
        itemName: "",
        qty: "",
        price: "",
        amount: "",
      }),
    );
  };

  const handleDeleteButtonClick = (index) => {
    dispatch(deleteItem(index));
  };

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;

    if (field === "qty" || field === "price") {
      const qty = parseFloat(updatedItems[index]["qty"]) || 0;
      const price = parseFloat(updatedItems[index]["price"]) || 0;
      updatedItems[index]["amount"] = (qty * price).toFixed(2);
    }

    dispatch(updateTotalAmount(updatedItems));
  };

  const handlePrintButtonClick = () => {
    dispatch(
      setCustomerDetails({
        invoiceNumber: invoiceNo,
        CustomerName: customerName,
        phoneNumber: phoneNumber,
        email: email,
        date: date,
        address: address,

        // invoiceNumber: '',
        // CustomerName : '',
        // phoneNumber: '',
        // email: '',
        // address: '',
      }),
    );

    // const newInvoiceNumber = invoiceNumber + 1;
    // setInvoiceNumber(newInvoiceNumber);

    // Log the customer details, items, and total amount
    console.table("Customer Details", "Invoice Data:", {
      customerDetails,
      items,
      totalAmount,
      // invoiceNumber: newInvoiceNumber,
    });

    // console.table("customer-details", "Invoice Data:", { items, totalAmount });
  };

  // useEffect(() => {

  // }, [items, totalAmount]);

  return (
    <div id="main">
      <div id="main-nav">
        <nav>
          <h1>INVOICE</h1>
        </nav>
        <div id="body">
          <div id="customer-details">
            <tr>
              <td>
                <label>Customer-Name : </label>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Customer-name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
              </td>

              <td>
                <label>invoice-no : </label>
              </td>
              <td>
                <input
                  type="tel"
                  placeholder="# invoice-no"
                  value={invoiceNo}
                  readOnly
                  // onChange={(e) => setInvoiceNo(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label>Phone Number : </label>
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Phone-number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </td>

              <td>
                <label>Date : </label>
              </td>
              <td>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                />
              </td>
            </tr>

            <tr>
              <td>
                <label>E-mail : </label>
              </td>
              <td>
                <input
                  type="email"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>
                <label>Address : </label>
              </td>
              <td>
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </td>
            </tr>
          </div>
          <br></br>
          <div id="product-listtable">
            <table>
              <thead id="headings">
                <tr>
                  <th className="header1">S.NO</th>
                  <th className="header2">Product-Name</th>
                  <th className="header3">Quantity</th>
                  <th className="header3">Price</th>
                  <th className="header3">Amount</th>
                  {/* <th className='header3'>Actions</th> */}
                </tr>
              </thead>
              <tbody id="items-list">
                {items.map((item, index) => (
                  <tr key={index}>
                    <td className="header1">
                      <input
                        type="number"
                        placeholder="s.no"
                        value={item.sNo}
                        readOnly
                      />
                    </td>
                    <td className="header2">
                      <input
                        type="text"
                        placeholder="Item-Name"
                        value={item.itemName}
                        onChange={(e) =>
                          handleInputChange(index, "itemName", e.target.value)
                        }
                      />
                    </td>
                    <td className="header3">
                      <input
                        type="number"
                        placeholder="Qty."
                        value={item.qty}
                        onChange={(e) =>
                          handleInputChange(index, "qty", e.target.value)
                        }
                      />
                    </td>
                    <td className="header3">
                      <input
                        type="number"
                        placeholder="Price"
                        value={item.price}
                        onChange={(e) =>
                          handleInputChange(index, "price", e.target.value)
                        }
                      />
                    </td>
                    <td className="header3">
                      <input
                        type="number"
                        placeholder="Amount"
                        value={item.amount}
                        readOnly
                      />
                    </td>
                    <td className="header3">
                      <button
                        id="btn-del"
                        onClick={() => handleDeleteButtonClick(index)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <br></br>
              <button id="btn-new" onClick={handleNewButtonClick}>
                NEW
              </button>

              <tfoot>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Total Amount</th>
                  <th className="header3">
                    <input
                      type="number"
                      id="total"
                      value={totalAmount}
                      readOnly
                    />
                  </th>
                  <th></th>
                </tr>
              </tfoot>
            </table>
            <br></br>
            <div id="print">
              <button id="btn-print" onClick={handlePrintButtonClick}>
                Print
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
