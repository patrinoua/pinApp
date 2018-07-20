//from pinclick to share pin with everybody
                        <button
                            id="sharePin"
                            className="pinAppButton"
                            onClick={() => {
                                emit("sharePin", this.props.pinId);
                            }}
                        >
                            publish
                        </button>
