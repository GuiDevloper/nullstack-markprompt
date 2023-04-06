import Nullstack, { NullstackClientContext } from 'nullstack'

import { findProject, PROJECTS } from '../utils/projects'

class ProjectIcon extends Nullstack {

  render({ params }: NullstackClientContext) {
    const { name, Icon } = findProject(params.project)
    if (!Icon) return name ? <b>{name}</b> : false

    return <>{PROJECTS.map((P) => P.Icon && P.name === name && <P.Icon />)}</>
  }

}

export default ProjectIcon
