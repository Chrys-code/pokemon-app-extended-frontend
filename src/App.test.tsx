// import { render, screen } from '@testing-library/react';
// import userEvent from "@testing-library/user-event";
// import { act } from 'react-dom/test-utils';
// import App from './App';
// import { getProducts, getProductsWithOptions } from './api/products';
// import axios from 'axios';

// /**
//  * Please not this is a behavioral test that includes both Provider and Consumer of the
//  * Counter app
//  * 
//  * For more detailed testing you could import and initialize the Provider separately
//  * then render the Consumer inside with the same tests...
//  */



// describe("<App />", () => {
//   beforeEach(() => {
//     render(<App />);
//   });

//   describe("when page is initialized", () => {
//     it("shows initial counter with value of 0", () => {
//       const counterEl = screen.getByTestId('counter-display');
//       expect(counterEl).toBeInTheDocument();
//       expect(counterEl).toHaveTextContent("0");
//     });

//     it("shows all the action buttons for the counter app", () => {
//       const btnIncrementBy1 = screen.getByTestId('counter-increment-1');
//       const btnIncrementBy2 = screen.getByTestId('counter-increment-2');
//       const btnDecrementBy1 = screen.getByTestId('counter-decrement-1');
//       const btnDecrementBy2 = screen.getByTestId('counter-decrement-2');
//       expect(btnIncrementBy1).toBeInTheDocument();
//       expect(btnIncrementBy2).toBeInTheDocument();
//       expect(btnDecrementBy1).toBeInTheDocument();
//       expect(btnDecrementBy2).toBeInTheDocument();
//     });
//   })
// });


// describe("<CounterApp />", () => {

//   // Setup
//   let counterEl: any;

//   beforeEach(() => {
//     render(<App />);
//     counterEl = screen.getByTestId('counter-display');
//   });


//   it("increases counter by 1 when user clicks increment by 1", () => {
//     // Prepare
//     const incrementBy1 = screen.getByTestId("counter-increment-1");

//     // Act
//     act(() => {
//       userEvent.click(incrementBy1);
//     })

//     // Assert
//     expect(counterEl).toHaveTextContent("1");
//   });

//   it("increases counter by 2 when user clicks increment by 2", () => {

//     // Prepare
//     const incrementBy2 = screen.getByTestId("counter-increment-2");


//     // Act
//     act(() => {
//       userEvent.click(incrementBy2);
//     })

//     // Assert
//     expect(counterEl).toHaveTextContent("2");
//   });


//   it("decreases counter by 1 when user clicks decrement by 1", () => {

//     // Prepare
//     const decrementBy2 = screen.getByTestId("counter-decrement-1")

//     // Act
//     act(() => {
//       userEvent.click(decrementBy2);
//     })

//     // Assert
//     expect(counterEl).toHaveTextContent("-1");
//   });


//   it("decreases counter by 2 when user clicks decrement by 2", () => {

//     // Prepare
//     const decrementBy2 = screen.getByTestId("counter-decrement-2")

//     // Act
//     act(() => {
//       userEvent.click(decrementBy2);
//     })

//     // Assert
//     expect(counterEl).toHaveTextContent("-2");
//   });
// })




// // TEST API CALL

// describe("GET Product api call", () => {

//   let spy: jest.SpyInstance;

//   const fakeResp = {
//     data: [
//       {
//         userId: 1,
//         id: 1,
//         title: 'My First Album'
//       },
//       {
//         userId: 1,
//         id: 2,
//         title: 'Album: The Sequel'
//       }
//     ]
//   }

//   beforeEach(() => {
//     // Spy on the axios method the function uses
//     // SPECIFIC TO FUNCTION THAT USES AXIOS GET
//     spy = jest.spyOn(axios, "get");
//   })

//   afterEach(() => {
//     jest.restoreAllMocks();
//   });


//   // SPECIFIC TO A SINGLE API CALL!
//   // It does not call the actual api
//   it("should return the first albums title", async () => {

//     // Prepare
//     (axios.get as jest.Mock).mockResolvedValue(fakeResp);
//     // (axios.get as jest.Mock).mockRejectedValue("[Error Could not fetch product]: ${err}`");

//     // Act
//     const data = await getProducts();

//     // Assert
//     expect(axios.get).toHaveBeenCalledTimes(1)
//     expect(data).toEqual("My First Album");
//   })


//   // SPECIFIC TO A FUNCTION THAT USES AXIOS FOR API CALL
//   // It calls the actual api
//   // it("should call axios with specific data", async () => {

//   //   // Act call you function that uses axios.get
//   //   await getProductsWithOptions("1");

//   //   expect(spy).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/albums/1", {
//   //     // params: { form_id: 1 },
//   //   });
//   // })
// })