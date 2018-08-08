import { dealForm, dealEntity, dealParams } from 'lib/mocks/types/deal';
import DealService from './deal';

describe('the deal service', () => {
  let service;
  beforeEach(() => {
    service = new DealService({});
    service.fetch.post = jest.fn();
    service.fetch.patch = jest.fn();
    service.fetch.get = jest.fn();
  });

  describe('deal to params', () => {
    it('should rename the attributes correctly', () => {
      expect(service.dealToParams(dealForm)).toEqual({
        deal_type: dealForm.dealType,
        listing_wmid: dealForm.listingWmid,
        title: dealForm.title,
        picture_id: dealForm.pictureId,
        description: dealForm.description,
        discount_details: {
          type: dealForm.discountDetails.type,
        },
        menu_item_ids: dealForm.menuItemIds,
        menu_item_category_ids: dealForm.menuItemCategoryIds,
        start_at: dealForm.startAt,
        end_at: dealForm.endAt,
        days_of_the_week: dealForm.daysOfTheWeek,
        min_price: dealForm.minPrice,
        max_price: dealForm.maxPrice,
        min_weight: dealForm.minWeight,
        max_weight: dealForm.maxWeight,
        min_quantity: dealForm.minQuantity,
        max_quantity: dealForm.maxQuantity,
      });
    });
  });

  describe('params to deal', () => {
    it('should rename the attributes correctly', () => {
      expect(service.paramsToDeal(dealParams)).toEqual({
        dealType: dealParams.deal_type,
        listingWmid: dealParams.listing_wmid,
        title: dealParams.title,
        pictureId: dealParams.picture_id,
        description: dealParams.description,
        discountDetails: {
          type: dealParams.discount_details.type,
        },
        menuItemIds: dealParams.menu_item_ids,
        menuItemCategoryIds: dealParams.menu_item_category_ids,
        startAt: dealParams.start_at,
        endAt: dealParams.end_at,
        daysOfTheWeek: dealParams.days_of_the_week,
        minPrice: dealParams.min_price,
        maxPrice: dealParams.max_price,
        minWeight: dealParams.min_weight,
        maxWeight: dealParams.max_weight,
        minQuantity: dealParams.min_quantity,
        maxQuantity: dealParams.max_quantity,
      });
    });
  });

  describe('when posting a new deal', () => {
    const expectedResponse = {
      data: {
        message: {
          title: 'Your deal has been submitted',
        },
        deal: dealEntity,
      },
    };

    beforeEach(() => {
      service.fetch.post.mockReturnValue(Promise.resolve(expectedResponse));
    });

    it('will call the correct API', async () => {
      const result = await service.postDeal(dealForm);
      expect(result).toEqual(expectedResponse);
      expect(service.fetch.post).toHaveBeenCalledWith(
        `https://api-g.weedmaps.com/wm/v1/listings/${
          dealForm.listingWmid
        }/deals`,
        service.dealToParams(dealForm),
      );
    });
  });

  describe('when patching an existing deal', () => {
    const expectedResponse = {
      data: {
        deal: dealEntity,
      },
    };

    beforeEach(() => {
      service.fetch.patch.mockReturnValue(Promise.resolve(expectedResponse));
    });

    it('will call the correct API', async () => {
      const result = await service.patchDeal(dealForm);
      expect(result).toEqual(expectedResponse);
      expect(service.fetch.patch).toHaveBeenCalledWith(
        `https://api-g.weedmaps.com/wm/v1/deals/${dealForm.id}`,
        service.dealToParams(dealForm),
      );
    });
  });

  describe('when getting an existing deal', () => {
    const expectedResponse = {
      data: {
        deal: dealEntity,
      },
    };

    beforeEach(() => {
      service.fetch.get.mockReturnValue(Promise.resolve(expectedResponse));
    });

    it('will call the correct API', async () => {
      const result = await service.getDeal(dealForm.id);
      expect(result).toEqual(expectedResponse);
      expect(service.fetch.get).toHaveBeenCalledWith(
        `https://api-g.weedmaps.com/wm/v1/deals/${dealForm.id}`,
      );
    });
  });
});
