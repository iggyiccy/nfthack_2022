import React from "react";
import Image from "next/image";
import Heading from "../components/header";
import Script from "next/script";

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.unlockHandler = this.unlockHandler.bind(this);
    this.checkout = this.checkout.bind(this);
    this.state = {
      locked: "pending", // there are 3 state: pending, locked and unlocked
    };
  }

  /**
   * When the component mounts, listen to events from unlockProtocol
   */
  componentDidMount() {
    window.addEventListener("unlockProtocol", this.unlockHandler);
  }

  /**
   * Make sure we clean things up before unmounting
   */
  componentWillUnmount() {
    window.removeEventListener("unlockProtocol", this.unlockHandler);
  }

  /**
   * Invoked to show the checkout modal provided by Unlock (optional... but convenient!)
   */
  checkout() {
    window.unlockProtocol && window.unlockProtocol.loadCheckoutModal();
  }

  /**
   * event handler
   * @param {*} e
   */
  unlockHandler(e) {
    this.setState((state) => {
      return {
        ...state,
        locked: e.detail,
      };
    });
  }
  render() {
    const { locked } = this.state;
    return (
      <>
        <div className="mx-auto text-center px-4">
          <Heading />
          {locked === "locked" && (
            <div onClick={this.checkout} style={{ cursor: "pointer" }}>
              Unlock me!{" "}
              <span aria-label="locked" role="img">
                Unlock me!
              </span>
            </div>
          )}
          {locked === "unlocked" && (
            <section className="text-gray-600 body-font">
              <div className="container px-20 py-24 mx-auto">
                <div className="flex flex-wrap -m-4 justify-center items-center">
                  <div className="lg:w-1/4 p-4 w-1/2">
                    <a className="block relative h-48 rounded overflow-hidden">
                      <Image
                        alt="ecommerce"
                        width="500"
                        height="500"
                        className="object-cover object-center w-full h-full block"
                        src="https://star-name-registry.com/blog/images/d/0/1/f/a/d01faec7ef04415eec34c1bfe61913e167fb26c7-snr-blog-37-resized.jpg"
                      />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        GAME NIGHT
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        The Catalyzer
                      </h2>
                    </div>
                  </div>
                  <div className="lg:w-1/4 p-4 w-1/2">
                    <a className="block relative h-48 rounded overflow-hidden">
                      <Image
                        alt="ecommerce"
                        width="500"
                        height="500"
                        className="object-cover object-center w-full h-full block"
                        src="https://star-name-registry.com/blog/images/d/0/1/f/a/d01faec7ef04415eec34c1bfe61913e167fb26c7-snr-blog-37-resized.jpg"
                      />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        GAME NIGHT
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        Shooting Stars
                      </h2>
                    </div>
                  </div>
                  <div className="lg:w-1/4 p-4 w-1/2">
                    <a className="block relative h-48 rounded overflow-hidden">
                      <Image
                        alt="ecommerce"
                        width="500"
                        height="500"
                        className="object-cover object-center w-full h-full block"
                        src="https://star-name-registry.com/blog/images/d/0/1/f/a/d01faec7ef04415eec34c1bfe61913e167fb26c7-snr-blog-37-resized.jpg"
                      />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        GAME NIGHT
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        Neptune
                      </h2>
                    </div>
                  </div>
                  <div className="lg:w-1/4 p-4 w-1/2">
                    <a className="block relative h-48 rounded overflow-hidden">
                      <Image
                        alt="ecommerce"
                        width="500"
                        height="500"
                        className="object-cover object-center w-full h-full block"
                        src="https://star-name-registry.com/blog/images/d/0/1/f/a/d01faec7ef04415eec34c1bfe61913e167fb26c7-snr-blog-37-resized.jpg"
                      />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        GAME NIGHT
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        The 400 Blows
                      </h2>
                    </div>
                  </div>
                  <div className="lg:w-1/4 p-4 w-1/2">
                    <a className="block relative h-48 rounded overflow-hidden">
                      <Image
                        alt="ecommerce"
                        width="500"
                        height="500"
                        className="object-cover object-center w-full h-full block"
                        src="https://star-name-registry.com/blog/images/d/0/1/f/a/d01faec7ef04415eec34c1bfe61913e167fb26c7-snr-blog-37-resized.jpg"
                      />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        GAME NIGHT
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        The Catalyzer
                      </h2>
                    </div>
                  </div>
                  <div className="lg:w-1/4 p-4 w-1/2">
                    <a className="block relative h-48 rounded overflow-hidden">
                      <Image
                        alt="ecommerce"
                        width="500"
                        height="500"
                        className="object-cover object-center w-full h-full block"
                        src="https://star-name-registry.com/blog/images/d/0/1/f/a/d01faec7ef04415eec34c1bfe61913e167fb26c7-snr-blog-37-resized.jpg"
                      />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        GAME NIGHT
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        Shooting Stars
                      </h2>
                    </div>
                  </div>
                  <div className="lg:w-1/4 p-4 w-1/2">
                    <a className="block relative h-48 rounded overflow-hidden">
                      <Image
                        alt="ecommerce"
                        width="500"
                        height="500"
                        className="object-cover object-center w-full h-full block"
                        src="https://star-name-registry.com/blog/images/d/0/1/f/a/d01faec7ef04415eec34c1bfe61913e167fb26c7-snr-blog-37-resized.jpg"
                      />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        GAME NIGHT
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        Neptune
                      </h2>
                    </div>
                  </div>
                  <div className="lg:w-1/4 p-4 w-1/2">
                    <a className="block relative h-48 rounded overflow-hidden">
                      <Image
                        alt="ecommerce"
                        width="500"
                        height="500"
                        className="object-cover object-center w-full h-full block"
                        src="https://star-name-registry.com/blog/images/d/0/1/f/a/d01faec7ef04415eec34c1bfe61913e167fb26c7-snr-blog-37-resized.jpg"
                      />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        GAME NIGHT
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        The 400 Blows
                      </h2>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          <footer className="mt-20">
            <a
              href="https://github.com/iggyiccy/nfthack_2022"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-700"
            >
              View on GitHub
            </a>
          </footer>
        </div>
      </>
    );
  }
}

export default Gallery;
