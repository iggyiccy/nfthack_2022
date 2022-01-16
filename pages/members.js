import React from "react";
import Image from "next/image";

// export class  extends Component {
//   state = {
//     tickets: [],
//   };

//   constructor() {
//     super();

//     // GET All Ticket Dates
//     axios.get("http://localhost:23455/TicketApplication").then((res) => {
//       console.log(res.data);
//       this.setState({ tickets: res.data });
//     });
//   }

//   render() {
//     return (
//       <div>
//         {this.state.tickets.map((ticket) => (
//           <Card className="text-center">
//             <Card.Header>
//               Ticket:{" "}
//               <p key={ticket.id} value={ticket.id}>
//                 {ticket.id}
//               </p>
//             </Card.Header>
//             <Card.Body>
//               <Card.Title>
//                 <p key={ticket.id} value={ticket.id}>
//                   {ticket.firstName} {ticket.lastName}
//                 </p>
//               </Card.Title>
//               <Card.Text>
//                 First choice:{" "}
//                 <p key={ticket.id} value={ticket.id}>
//                   {ticket.choice1Id}
//                 </p>
//                 &nbsp; &nbsp; Second choice:{" "}
//                 <p key={ticket.id} value={ticket.id}>
//                   {ticket.choice2Id}
//                 </p>
//                 ); &nbsp; &nbsp; Third choice:{" "}
//                 <p key={ticket.id} value={ticket.id}>
//                   {ticket.choice3Id}
//                 </p>
//                 );
//               </Card.Text>
//             </Card.Body>
//             <Card.Footer className="text-muted">
//               <Button variant="primary">Remove Ticket</Button>
//             </Card.Footer>
//           </Card>
//         ))}
//       </div>
//     );
//   }
// }

function Members() {
  const query = `{
        keys(where: {lock: "0x869e113e5ff786a9ae8027b73f3eb54b94a159be"}) {
            id
            lock {
                id
            }
            keyId
            owner {
                id
            }
            expiration
            tokenURI
            createdAt
        }
    }`;

  // We send a POST request to the subgraph endpoint of our choice (change if using a different network!)
  // The body of the request must include a stringified version of and object built with the query and variables
  const result = fetch(
    "https://api.thegraph.com/subgraphs/name/unlock-protocol/unlock-rinkeby",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    }
  )
    .then((r) => r.json())
    .then((r) => r.data.keys)
    .then((r) => console.log(r));
  // .then((r) => JSON.parse(r));

  //   // loop through keys and display in cards
  //   const keys = result.map((key) => {
  //     return (
  //       <div className="card" key={key.id}>
  //         <div className="card-body">
  //           <h5 className="card-title">{key.keyId}</h5>
  //           <p className="card-text">
  //             <strong>Owner:</strong> {key.owner.id}
  //           </p>
  //           <p className="card-text">
  //             <strong>Expiration:</strong> {key.expiration}
  //           </p>
  //           <p className="card-text">
  //             <strong>Token URI:</strong> {key.tokenURI}
  //           </p>
  //           <p className="card-text">
  //             <strong>Created At:</strong> {key.createdAt}
  //           </p>
  //         </div>
  //       </div>
  //     );
  //   });

  const Details = ({ memberId, memberKeyId, memberCreateAt }) => (
    <li className="py-3 sm:py-4">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <Image
            className="w-8 h-8 rounded-full"
            width="100"
            height="100"
            src="https://flowbite.com/docs/images/people/profile-picture-1.jpg"
            alt="Neil image"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {memberId}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {memberKeyId}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {memberCreateAt}
        </div>
      </div>
    </li>
  );

  return (
    <>
      <div>
        {Object.values(result).flatMap((r) =>
          Object.values(r).map(({ id, keyId, createdAt }) => (
            <Details
              memberId={id}
              memberKeyId={keyId}
              memberCreateAt={createdAt}
              key={keyId}
            />
          ))
        )}
      </div>
    </>
  );
}

export default Members;
