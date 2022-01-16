import React from "react";
import Image from "next/image";
import Heading from "../components/header";
import { useState, useEffect } from "react";

function Members() {
  const query = `{
        keys(where: {lock: "0xbB8a1e4830bBAe55283Ef6C43996044698E8d6DE"}) {
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
    .then((r) => r.data.keys);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
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
        .then((r) => r.data.keys);
      setData(res);
    };
    fetchData();
  }, [setData]);

  return (
    <>
      <div className="mx-auto text-center px-4">
        <Heading />
        <div className="mx-auto text-center mt-10 px-4 p-4 max-w-2xl bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
          <div className="flow-root">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700"
            >
              {data.map((item) => (
                <li className="py-3 sm:py-4" key={item.keyId}>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <Image
                        className="w-8 h-8 rounded-full"
                        width="100"
                        height="100"
                        src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {item.owner.id}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        Created:{" "}
                        {new Date(item.createdAt * 1000).toLocaleString()}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {item.keyId}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default Members;
