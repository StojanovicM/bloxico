import classNames from 'classnames'

export const Paginator: React.FC<IProps> = ({ total, current, updatePage }) => {

  return (
    <div className="paginator">
      { [...Array(total).keys()].map(i => {
        const n = i + 1
        return <button
            key={ i }
            onClick={ () => updatePage(n) }
            className={classNames({'active': n === current })}>{ n }</button>
        })
      }
    </div>
  )
}


interface IProps {
  total: number;
  current: number;
  updatePage: (n:number) => void
}