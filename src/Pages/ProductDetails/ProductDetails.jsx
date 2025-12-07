import React from 'react'
import { useParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import useAxios from '../../hooks/useAxios'

const ProductDetails = () => {

    const {id} = useParams()
    const fetchAxios = useAxios()
    const {data: product} = useQuery({
        queryKey: ['products', id],
        queryFn: async ()=>{
            const res = await fetchAxios.get(`/products/${id}`)
            return res.data
        }
    })

  return (
    <div>ProductDetails</div>
  )
}

export default ProductDetails