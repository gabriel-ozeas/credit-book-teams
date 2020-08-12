import { mutate } from 'swr'
import { useRouter } from 'next/router'
import { claimCredit } from '../../../api/mutations'

const ClaimCredit = ({ credit }) => {
  const router = useRouter()
  const { teamid } = router.query

  const handleClick = async () => {
    const claimedCredit = await claimCredit(teamid, credit.id)
    mutate(
      `/api/credits/${teamid}/unclaimed`,
      async (cachedCredits) => {
        return cachedCredits.map((cachedCredit) =>
          cachedCredit.id === credit.id
            ? {
                ...cachedCredit,
                claimedAt: claimedCredit.claimedAt,
                claimedBy: { name: claimedCredit.claimedBy?.name },
              }
            : cachedCredit
        )
      },
      false
    )
  }
  if (credit.claimedAt)
    return (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='44'
        height='44'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='#2c3e50'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' />
        <polyline points='9 11 12 14 20 6' />
        <path d='M20 12v6a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h9' />
      </svg>
    )
  return (
    <button onClick={handleClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='44'
        height='44'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='#2c3e50'
        fill='none'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <path stroke='none' d='M0 0h24v24H0z' />
        <rect x='4' y='4' width='16' height='16' rx='2' />
      </svg>
    </button>
  )
}

export default ClaimCredit