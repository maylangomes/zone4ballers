import { NextRequest, NextResponse } from 'next/server';
import {
  Shippo,
  AddressCreateRequest,
  ParcelCreateRequest,
  DistanceUnitEnum,
  WeightUnitEnum,
} from 'shippo';

const shippo = new Shippo({
  apiKeyHeader: 'shippo_test_a221da6720c36b41b1e265e2fbf66fa7b9cc7453',
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    let addressTo = JSON.parse(
      formData.get('addressTo') as string,
    ) as AddressCreateRequest;

    const addressFrom: AddressCreateRequest = {
      name: 'Maylan Gomes',
      street1: '20 Rue de Flore',
      city: 'Eragny',
      state: '',
      zip: '95610',
      country: 'FR',
      phone: '+33 6 37 26 91 05',
      email: 'maylangomes96@gmail.com',
    };

    const parcel: ParcelCreateRequest = {
      length: '10',
      width: '20',
      height: '5',
      distanceUnit: DistanceUnitEnum.In,
      weight: '2',
      massUnit: WeightUnitEnum.Lb,
    };

    const shipment = await shippo.shipments.create({
      addressFrom: addressFrom,
      addressTo: addressTo,
      parcels: [parcel],
      async: false,
    });

    if (shipment && shipment.rates) {
      const detailedRates = shipment.rates.map((rate) => ({
        provider: rate.provider,
        amount: rate.amount,
        currency: rate.currency,
      }));

      return NextResponse.json(detailedRates, { status: 200 });
    } else {
      return NextResponse.json(
        { error: 'Aucun tarif trouvé.' },
        { status: 404 },
      );
    }
  } catch (error: any) {
    console.error('Erreur lors de la récupération des tarifs:', error);

    return NextResponse.json(
      { error: error.message || 'Erreur lors de la récupération des tarifs.' },
      { status: 500 },
    );
  }
}
