import React from "react";
import PropTypes from "prop-types";
const GroupList = ({
    items,
    valueProperty,
    contentProperty,
    onItemsSelect,
    selectedItems
}) => {
    console.log(items);
    return (
        <ul className="list-group">
            {Object.keys(items).map((item) => (
                <li
                    key={items[item][valueProperty]}
                    className={
                        "list-group-item" +
                        (selectedItems.includes(items[item][contentProperty]) ? " active" : "")
                    }
                    onClick={() => onItemsSelect(items[item][contentProperty])}
                    role="button"
                >
                    <input className="form-check-input" type="checkbox" value={items[item][valueProperty]}
                        checked={selectedItems.includes(items[item][contentProperty])}
                        onChange={() => { }}
                    />

                    {items[item][contentProperty]}
                </li>
            ))}
        </ul>
    );
};
GroupList.defaultProps = {
    contentProperty: "name",
    valueProperty: "_id"
};
GroupList.propTypes = {
    items: PropTypes.object.isRequired,
    contentProperty: PropTypes.string.isRequired,
    valueProperty: PropTypes.string.isRequired,
    onItemsSelect: PropTypes.func,
    selectedItems: PropTypes.array
};
export default GroupList;
