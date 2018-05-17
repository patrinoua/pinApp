
<div className="thirdRowPinClick ">
    <div className="boxPinClick">
        {/*<div className="ratingStars">
            *****
        </div>*/}
        {this.state.editMode&&(
        <div className="colPinClick">

            <textarea
                placeholder="Title"
                className="titleTextareaPinClick"
                type="text"
                name="title"
                rows="1"
                onChange={this.handleChange}
            />
            <textarea
                placeholder="Add Description"
                className="descriptionTextareaPinClick"
                type="text"
                name="description"
                onChange={this.handleChange}
                rows="3"
            />
        </div>)
    ||
    (
        <div className="colPinClick">
            <div>
                {this.state.title || 'Title'}
            </div>
            <div>
                {this.state.description || 'Description'}
            </div>
        </div>
    )
}
    </div>
    <div className="colPinClick">
        <a
            href="https://www.facebook.com/"
            className="boxPinClick"
            target="blank"
        >
            <img
                src="/icons/facebook.png"
                className="shareButtons"
            />
        </a>
    </div>
</div>
<div className="pinEditSaveButtonArea box">
    {this.state.editMode&&
        (<h1 className="saveButton" onClick={this.toggleEditMode}> SAVE </h1>)
    ||
        (<h1 className="saveButton" onClick={this.toggleEditMode}> edit </h1>)
    }
        <button onClick={this.props.togglePinClick} className="saveButton" >
            Close
        </button>
</div>
