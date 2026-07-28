import React from "react";

const WalkAwayModal = ({ isOpen, onCancel, onConfirm }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div className="bg-blue-950 border-2 border-yellow-500 rounded-2xl p-8 w-[420px] text-center">

                <h2 className="text-3xl font-bold text-yellow-400 mb-4">
                    Walk Away?
                </h2>

                <p className="text-gray-200 mb-8">
                    Are you sure you want to walk away with your current winnings?
                </p>

                <div className="flex justify-center gap-5">

                    <button
                        onClick={onCancel}
                        className="px-6 py-2 rounded-lg bg-gray-600 hover:bg-gray-700"
                    >
                        No
                    </button>

                    <button
                        onClick={onConfirm}
                        className="px-6 py-2 rounded-lg bg-red-600 hover:bg-red-700"
                    >
                        Yes
                    </button>

                </div>

            </div>
        </div>
    );
};

export default WalkAwayModal;