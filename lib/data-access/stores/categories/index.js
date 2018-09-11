import { types, getEnv } from 'mobx-state-tree';
import Department from '../../models/departments';

const transform = departments =>
  departments.map(department => {
    const { id, name, position, iconImage, avatarImage } = department;

    return Department.create({
      id,
      name,
      position,
      iconImageUrl: iconImage ? iconImage.mediumUrl : '',
      avatarImageUrl: avatarImage ? avatarImage.mediumUrl : '',
    });
  });

const CategoryStore = types
  .model('CategoryStore', {
    departments: types.array(Department),
  })
  .actions(self => ({
    async getDepartments(regionId) {
      try {
        const departments = await getEnv(self).client.fetch(
          `buyer/regions/${regionId}/departments?include=avatar_image,icon_image`,
        );

        const transformed = transform(departments);

        self.setDepartments(transformed);
      } catch (e) {
        console.log(e);
      }
    },
    setDepartments(departments) {
      self.departments = departments;
    },
  }));

export default CategoryStore;
