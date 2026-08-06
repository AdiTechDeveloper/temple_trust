import { FiPlus, FiTrash2 } from "react-icons/fi";
import "./FamilyMemberFields.css";

export default function FamilyMemberFields({ members, onChange }) {

    const updateMember = (index, field, value) => {

        const updated = [...members];

        updated[index][field] = value;

        onChange(updated);
    };

    const addMember = () => {

        onChange([
            ...members,
            {
                name: "",
                relation: "",
                dob: "",
                anniversaryDate: "",
                type: "Birthday",
            },
        ]);
    };

    const removeMember = (index) => {

        onChange(members.filter((_, i) => i !== index));
    };

    return (
        <div className="family-members-block">

            {members.map((member, i) => (

                <div key={i} className="family-member-row">

                    <div className="family-member-fields">

                        <input
                            type="text"
                            placeholder="Name"
                            value={member.name}
                            onChange={(e) =>
                                updateMember(i, "name", e.target.value)
                            }
                        />

                        <input
                            type="text"
                            placeholder="Relation"
                            value={member.relation}
                            onChange={(e) =>
                                updateMember(i, "relation", e.target.value)
                            }
                        />

                        <select
                            value={member.type}
                            onChange={(e) =>
                                updateMember(i, "type", e.target.value)
                            }
                        >
                            <option value="Birthday">Birthday</option>
                            <option value="Anniversary">Anniversary</option>
                        </select>

                        {member.type === "Birthday" ? (
                            <input
                                type="date"
                                value={member.dob}
                                onChange={(e) =>
                                    updateMember(i, "dob", e.target.value)
                                }
                            />
                        ) : (
                            <input
                                type="date"
                                value={member.anniversaryDate}
                                onChange={(e) =>
                                    updateMember(i, "anniversaryDate", e.target.value)
                                }
                            />
                        )}

                    </div>

                    <button
                        type="button"
                        className="family-member-remove"
                        onClick={() => removeMember(i)}
                    >
                        <FiTrash2 />
                    </button>

                </div>

            ))}

            <button
                type="button"
                className="family-member-add"
                onClick={addMember}
            >
                <FiPlus />
                Add Family / Friend Member
            </button>

        </div>
    );
}