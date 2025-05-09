
interface ModalProps {
    isOpen: boolean,
    onClose: () => void
    children: React.ReactNode,
    cancelButton?: boolean
}

export const Modal = ( { children, isOpen, onClose, cancelButton = true }: ModalProps ) => {

    return (
        <>
        {
            isOpen && 
                <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-[#0a0a0ac7] py-10">
                    <div className="max-h-full w-full max-w-xl overflow-y-auto sm:rounded-2xl bg-[#242424]">
                        <div className="w-full">
                            <div className="m-8 my-20 max-w-[400px] mx-auto text-gray-100">
                                <div className="mb-8">
                                    {children}
                                </div>
                                {
                                    cancelButton &&
                                    <div className="space-y-4">   
                                        <button onClick={onClose} className="cursor-pointer p-3 bg-red-800 text-amber-50 border rounded-full w-full font-semibold">Cerrar</button>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
        }
        </>
    )

}
