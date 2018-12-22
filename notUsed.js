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


                        <input
                        id="searchboxInputField"
                        name="searchbox"
                        placeholder="search"
                        onChange={
                            this.handleSearchboxChange
                        }
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                var geocoder = new google.maps.Geocoder();
                                geocoder.geocode(
                                    {
                                        address: this
                                        .searchbox
                                    },
                                    (
                                        results,
                                        status
                                    ) => {
                                        if (
                                            status ==
                                            google.maps
                                            .GeocoderStatus
                                            .OK
                                        ) {
                                            this.setState(
                                                {
                                                    lat: results[0].geometry.location.lat(),
                                                    lng: results[0].geometry.location.lng()
                                                }
                                            );
                                        }
                                    }
                                );
                            }
                        }}
                        />
