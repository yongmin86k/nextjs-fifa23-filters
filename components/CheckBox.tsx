import Image from 'next/image'

interface Props {
  checked: boolean;
}

export const CheckBox = ({ checked }: Props = { checked: false }) => {
  console.log(checked)

  return (
    <Image
      src="/icons/check_box_outline_blank_FILL0_wght400_GRAD0_opsz48.svg"
      height={100}
      width={100}
      alt="Players"
    />
  )
}
