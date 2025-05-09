

export const statusStyles = (status: 'pending' | 'completed' | 'cancelled') => {
    const statuses = {
        'pending': 'text-yellow-400 bg-[#ffda3338]',
        'completed': 'text-green-400 bg-[#36ff3322]',
        'cancelled': 'text-red-500 bg-[#ff333322]',
    }


    return statuses[status] || 'bg-gray-500 text-white';
}
